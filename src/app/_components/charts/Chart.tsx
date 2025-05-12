import { Button } from "@mui/material";
import { PropsWithChildren, ReactNode } from "react";
//Children Components 
function Title({ children }: PropsWithChildren) {
    return (
        <h2 className='font-bold text-2xl'>{children}</h2>
    )
}
function Grid({ children }: PropsWithChildren) {
    return <table className=''>{children}</table>
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
    return <th className='text-left underline mb-5'>{children}</th>
}
function GridRow({ children, hoverable }: { children: ReactNode, hoverable?: boolean }) {
    return <tr className={hoverable ? "hover:underline" : ''}>{children}</tr>
}
function GridCell({ children }: PropsWithChildren) {
    return (
        <td><div className='flex text-white'>{children}</div></td>
    )
}

function GridButton({ children, disabled, onClick }: { children: ReactNode, disabled?: boolean, onClick?: () => void }) {

    const getStyles = () => {

        if (disabled) return {
            color: 'grey',
            cursor: 'disabled'
        }
        else return {
            cursor: "pointer"
        };
    }
    return (
        <button type='submit' onClick={onClick} style={getStyles()} disabled={disabled}>{children}</button>
    )
}

//Root Component
function Chart({ children }: PropsWithChildren) {
    return (
        <div className="dark:text-white text-base flex flex-col gap-4 border-2 rounded-2xl px-6 py-2 ">
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
Chart.GridButton = GridButton;

export default Chart; 