import clsx from "clsx";
import { ReactNode } from "react";

function QuestionGroup({ children }: { children: ReactNode }) {
  return (
    <fieldset className="shrink border-2 rounded-2xl px-3 py-2 bg-white ">
      {" "}
      {children}
    </fieldset>
  );
}

function Title({ children }: { children: ReactNode }) {
  return (
    <legend className=" tracking-wider leading px-3 border-2 shadow-black drop-shadow-black drop-shadow rounded-full shadow-2xl bg-emerald-950 border-black text-white">
      {children}
    </legend>
  );
}
function List({ children }: { children: ReactNode }) {
  return <ul>{children}</ul>;
}
function ListItem({
  children,
  direction,
}: {
  children: ReactNode;
  direction: "vertical" | "horizontal";
}) {
  const className = clsx("flex gap-3", {
    "inline-block mx-4": direction === "horizontal",
  });

  return <li className={className}>{children}</li>;
}
type ListItemRadioInputProps = {
  id: string;
  name: string;
  value: string | number;
};
function ListItemRadioInput({ id, name, value }: ListItemRadioInputProps) {
  return <input type="radio" id={id} name={name} value={value} />;
}
type ListItemLabelProps = {
  children: ReactNode;
  htmlFor: string;
};
function ListItemLabel({ children, htmlFor }: ListItemLabelProps) {
  return <label htmlFor={htmlFor}> {children}</label>;
}

QuestionGroup.Title = Title;
QuestionGroup.List = List;
QuestionGroup.ListItem = ListItem;
QuestionGroup.ListItemRadioInput = ListItemRadioInput;
QuestionGroup.ListItemLabel = ListItemLabel;
export default QuestionGroup;
