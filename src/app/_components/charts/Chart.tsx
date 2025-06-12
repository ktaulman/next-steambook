import { PropsWithChildren, ReactNode } from "react";

function Chart({ children }: PropsWithChildren) {
  return (
    <div className="flex flex-col gap-4  px-6 py-2 text-sm h-">{children}</div>
  );
}

//Children Components
function Title({ children }: PropsWithChildren) {
  return <h2 className="font-bold text-2xl ">{children}</h2>;
}
function Grid({ children }: PropsWithChildren) {
  return <table className="border-collapse w-full relative ">{children}</table>;
}
function GridBody({ children }: PropsWithChildren) {
  return <tbody className="mt-10 overflow-y-auto">{children}</tbody>;
}
function GridHead({ children }: PropsWithChildren) {
  return <thead className="sticky top-0 z-10">{children}</thead>;
}
function GridFoot({ children }: PropsWithChildren) {
  return <tfoot>{children}</tfoot>;
}
function GridHeader({ children }: PropsWithChildren) {
  return (
    <th className="text-left tracking-wide font-bold text-sm ">{children}</th>
  );
}
function GridRow({
  children,
  hoverable,
}: {
  children: ReactNode;
  hoverable?: boolean;
}) {
  return (
    <tr
      className={
        hoverable
          ? " border-b-2 border-b-transparent hover:border-b-2 hover:border-black"
          : " "
      }
    >
      {children}
    </tr>
  );
}
function GridCell({ children }: PropsWithChildren) {
  return <td>{children}</td>;
}

//Root Component

Chart.Title = Title;
Chart.Grid = Grid;
Chart.GridHeader = GridHeader;
Chart.GridRow = GridRow;
Chart.GridCell = GridCell;
Chart.GridHead = GridHead;
Chart.GridFoot = GridFoot;
Chart.GridBody = GridBody;

export default Chart;
