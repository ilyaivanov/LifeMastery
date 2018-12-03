import TestRenderer from "react-test-renderer";

const renderer = (element: any) => {
  const rendered = TestRenderer.create(element);
  return {
    text: (id: string) => findTextById(rendered.root, verifyNotNull(id)),
    touch: (id: string) => touchById(rendered.root, verifyNotNull(id)),

    setText: (id: string, text: string) => {
      const item = findById(rendered.root, id);
      item.props.onChangeText(text);
    },

    setDateiOS: (id: string, date: Date) => {
      const item = findById(rendered.root, id);
      item.props.onDateChange(date);
    },

    setState: (state: any) => rendered.root.instance.setState(state),

    toJSON: () => rendered.toJSON()
  };
};

const verifyNotNull = (id: string) => {
  if (!id) throw new Error("You need to provide a valid id, but id was: " + id);
  return id;
};

const findTextById = (instance: any, id: string) =>
  instance.findByProps({ testID: id }).props.children;

const touchById = (instance: any, id: string) =>
  instance.findByProps({ testID: id }).props.onPress();

const findById = (instance:any, id:string) =>
  instance.findByProps({ testID: id });

export default renderer;
export type Rendered = ReturnType<typeof renderer>;
