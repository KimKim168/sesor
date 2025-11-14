import DeleteItemButton from '@/components/Button/DeleteItemButton';
import RecoverItem from '@/components/Button/RecoverItemButton';
import ViewItemButton from '@/components/Button/ViewItemButton';
import NoDataDisplay from '@/components/NoDataDisplay';
import TableCellActions from '@/components/Table/TableCellActions';
import TableCellText from '@/components/Table/TableCellText';
import TableHeadWithSort from '@/components/Table/TableHeadWithSort';
import { Table, TableBody, TableHeader, TableRow } from '@/components/ui/table';
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
                            <TableHeadWithSort field="contact_number" label="Contact Number" />
                            <TableHeadWithSort field="business_or_store_name" label="Business / Store Name" />
                            <TableHeadWithSort field="email" label="Email" />
                            <TableHeadWithSort field="contact_method" label="Contact Method" />
                        </TableRow>
                    </TableHeader>
                    <TableBody className="table-body rounded-md">
                        {tableData?.map((item: any, index: number) => (
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
                                            recoverPath={`/admin/inquiry-lead-form/${item.id}/recover`}
                                            permission="user update"
                                        />
                                    ) : (
                                        <>
                                            <ViewItemButton url={`/admin/inquiry-lead-form/${item.id}`} permission="page view" />
                                            <DeleteItemButton deletePath="/admin/inquiry-lead-form/" id={item.id} permission="page delete" />
                                        </>
                                    )}
                                </TableCellActions>
                                <TableCellText value={item.name} />
                                <TableCellText value={item.contact_number} />
                                <TableCellText value={item.business_or_store_name} />
                                <TableCellText value={item.email} />
                                <TableCellText value={item.contact_method} />
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
