import TableCellAvatar from '@/components/Avatar/TableCellAvatar';
import DeleteItemButton from '@/components/Button/DeleteItemButton';
import EditItemButton from '@/components/Button/EditItemButton';
import RecoverItem from '@/components/Button/RecoverItemButton';
import ViewItemButton from '@/components/Button/ViewItemButton';
import NoDataDisplay from '@/components/NoDataDisplay';
import TableCellActions from '@/components/Table/TableCellActions';
import TableCellDate from '@/components/Table/TableCellDate';
import TableCellText from '@/components/Table/TableCellText';
import TableHeadWithSort from '@/components/Table/TableHeadWithSort';
import { Table, TableBody, TableCell, TableHeader, TableRow } from '@/components/ui/table';
import { router, usePage } from '@inertiajs/react';

const TableData = () => {
    const { tableData } = usePage<any>().props;
    return (
        <>
            <div className="table-data-container">
                <Table>
                    <TableHeader className="table-header">
                        <TableRow>
                            <TableHeadWithSort field="id" label="ID" />
                            <TableHeadWithSort label="Action" />
                            <TableHeadWithSort field="name" label="Name" />
                            <TableHeadWithSort field="name_kh" label="Name Khmer" />
                            <TableHeadWithSort field="position" label="Position" />
                            <TableHeadWithSort field="position_kh" label="Position Khmer" />
                            <TableHeadWithSort field="short_description" label="Short Description" />
                            <TableHeadWithSort field="short_description_kh" label="Short Description Khmer" />

                            
                            <TableHeadWithSort field="created_at" label="Created at" />
                            <TableHeadWithSort field="updated_at" label="Updated at" />
                        </TableRow>
                    </TableHeader>
                    <TableBody className="table-body rounded-md">
                        {tableData?.data?.map((item: any, index: number) => (
                            <TableRow
                                className="table-row"
                                key={item.id}
                                onDoubleClick={() => router.visit(`/admin/pages?selected_page_id=${item.id}`)}
                            >
                                <TableCellText value={item.id} />
                                <TableCellActions>
                                    {item.deleted_at ? (
                                        <RecoverItem
                                            deleted_at={item.deleted_at}
                                            recoverPath={`/admin/careers/${item.id}/recover`}
                                            permission="user update"
                                        />
                                    ) : (
                                        <>
                                            {/* Edit Dialog */}
                                            <EditItemButton url={`/admin/careers/${item.id}/edit`} permission="career update" />

                                            {/* View Dialog */}
                                            <ViewItemButton url={`/admin/careers/${item.id}`} permission="career view" />

                                            {/* Delete Item */}
                                            <DeleteItemButton deletePath="/admin/careers/" id={item.id} permission="career delete" />
                                        </>
                                    )}
                                </TableCellActions>
                                <TableCellText value={item.name} />
                                <TableCellText value={item.name_kh} />
                                <TableCellText value={item.position} />
                                <TableCellText value={item.position_kh} />
                                <TableCellText value={item.short_description} />
                                <TableCellText value={item.short_description_kh} />
                                <TableCellDate value={item.created_at} />
                                <TableCellDate value={item.updated_at} />
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
