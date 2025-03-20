import { PropsWithChildren } from "react";
//Children Components 
function Title({ children }: PropsWithChildren) {
    return (
        <h2>{children}</h2>
    )
}
function Grid({ children }: PropsWithChildren) {
    return <table className=' outline-1'>{children}</table>
}
function GridBody({ children }: PropsWithChildren) {
    return <tbody>{children}</tbody>
}
function GridHead({ children }: PropsWithChildren) {
    return <thead>{children}</thead>
}
function GridFoot({ children }: PropsWithChildren) {
    return <tfoot>{children}</tfoot>
}
function GridHeader({ children }: PropsWithChildren) {
    return <th>{children}</th>
}
function GridRow({ children }: PropsWithChildren) {
    return <tr>{children}</tr>
}
function GridCell({ children }: PropsWithChildren) {
    return (
        <td className='outline-1'>{children}</td>
    )
}

//Root Component
function Chart({ children }: PropsWithChildren) {
    return (
        <div className="dark:text-white">
            {children}
        </div>
    )
}

Chart.Title = Title;
Chart.Grid = Grid;
Chart.GridHeader = GridHeader;
Chart.GridRow = GridRow;
Chart.GridCell = GridCell;
Chart.GridHead = GridHead;
Chart.GridFoot = GridFoot;
Chart.GridBody = GridBody;

export default Chart; 