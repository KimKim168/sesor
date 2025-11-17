import DeleteItemButton from '@/components/Button/DeleteItemButton';
import RecoverItem from '@/components/Button/RecoverItemButton';
import ViewItemButton from '@/components/Button/ViewItemButton';
import NoDataDisplay from '@/components/NoDataDisplay';
import TableCellActions from '@/components/Table/TableCellActions';
import TableCellText from '@/components/Table/TableCellText';
import TableHeadWithSort from '@/components/Table/TableHeadWithSort';
import { Table, TableBody, TableHeader, TableRow, TableCell } from '@/components/ui/table';
import { router, usePage } from '@inertiajs/react';

const TableData = () => {
    const { tableData, career } = usePage<any>().props;

    return (
        <>
            <div className="table-data-container">
                <Table>
                    <TableHeader className="table-header">
                        <TableRow>
                            <TableHeadWithSort field="id" label="ID" />
                            <TableHeadWithSort label="Action" />
                            <TableHeadWithSort field="name" label="Name" />
                            <TableHeadWithSort field="career_id" label="Position" />
                            <TableHeadWithSort field="email" label="Email" />
                            <TableHeadWithSort field="phone_number" label="Phone Number" />
                            <TableHeadWithSort field="file" label="CV" />
                        </TableRow>
                    </TableHeader>

                    <TableBody className="table-body rounded-md">
                        {tableData?.data?.map((item: any) => (
                            <TableRow
                                className="table-row"
                                key={item.id}
                                onDoubleClick={() => router.visit(`/admin/career-submit/${item.id}`)}
                            >
                                <TableCellText value={item.id} />

                                <TableCellActions>
                                    {item.deleted_at ? (
                                        <RecoverItem
                                            deleted_at={item.deleted_at}
                                            recoverPath={`/admin/career-submits/${item.id}/recover`}
                                            permission="career_submit update"
                                        />
                                    ) : (
                                        <>
                                            <ViewItemButton
                                                url={`/admin/career-submits/${item.id}`}
                                                permission="career_submit view"
                                            />
                                            <DeleteItemButton
                                                deletePath="/admin/career-submits/"
                                                id={item.id}
                                                permission="career_submit delete"
                                            />
                                        </>
                                    )}
                                </TableCellActions>

                                <TableCellText value={item.name} />
                                <TableCellText value={item.career?.position} />
                                <TableCellText value={item.email} />
                                <TableCellText value={item.phone_number} />

                                {/* Show file link */}
                                <TableCell>
                                    {item.file ? (
                                        <a
                                            href={`/assets/files/career_submits/${item.file}`}
                                            target="_blank"
                                            className="text-primary underline"
                                        >
                                            View CV
                                        </a>
                                    ) : (
                                        <span className="text-gray-400">No File</span>
                                    )}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            {tableData?.data?.length < 1 && <NoDataDisplay />}
        </>
    );
};

export default TableData;
