
// The following component renders a virtualised list of rows in table format to ensure a large number of rows
// do not break the page

import { useSqlQueryExecutionContext } from "../context/SqlQueryExecutionContext"
import { Column, Table, AutoSizer } from "react-virtualized";
import { Spinner } from "./Spinner";

interface SqlDataVisualiserProps {
    containerHeight?: number
}

export function SqlDataVisualiser(props: SqlDataVisualiserProps) {
    const { containerHeight = 20 } = props
    const { data, isQueryExecuting, queryExecutionError } = useSqlQueryExecutionContext()

    const renderNoResults = () => {
        if (isQueryExecuting) {
            return <Spinner />
        } else if (queryExecutionError) {
            return <div className="no-results">Error Occurred: query not supported</div>
        } else {
            return <div className="no-results">Execute the query to see data</div>
        }
    }

    const getColumnsFromData = (): React.ReactNode[] | null => {
        if (data?.length > 0) {
            const dataObj = data[0];
            return Object.keys(dataObj).map((dataKey) => {
                return (<Column className="sql-table-cell" width={160} label={dataKey} dataKey={dataKey} />)
            })
        }

        return null
    }

    return (
        <div className="sql-data-container" style={{ height: `${containerHeight - 10}vh` }}>
            <div className="sql-data-container-header justify-between" style={{ height: `5vh` }}>
                <div className="sql-data-header-label">Output</div>
                <div className="sql-data-header-row-count">{data?.length > 0 ? `Total rows: ${data?.length}` : ''}</div>
            </div>
            <div className="sql-data-table-container" style={{ height: `${containerHeight - 15.2}vh` }}>
                {
                    data?.length > 0 ? (
                        <div className="sql-data-table-inner-container">
                            <AutoSizer>
                                {({ height, width }: { height: number, width: number }) => (
                                    <Table
                                        gridStyle={{ outline: "all" }}
                                        width={width}
                                        height={height}
                                        headerHeight={40}
                                        rowHeight={40}
                                        rowCount={data?.length}
                                        rowGetter={({ index }) => data?.[index]}
                                        className="sql-data-table"
                                        rowClassName="data-table-row"
                                        gridClassName="data-table-grid"
                                        headerClassName="data-table-header"
                                    >
                                        {getColumnsFromData()}
                                    </Table>
                                )}
                            </AutoSizer>
                        </div>

                    ) : renderNoResults()
                }
            </div>
        </div>
    )
}