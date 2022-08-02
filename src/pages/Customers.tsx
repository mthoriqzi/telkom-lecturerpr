// import React from 'react'

// import Table from '../components/table/Table'

// import customerList from '../assets/JsonData/customers-list.json'

// const customerTableHead = [
//     '',
//     'name',
//     'email',
//     'phone',
//     'total orders',
//     'total spend',
//     'location'
// ]

// const renderHead = ((item : any), index) => <th key={index}>{item}</th>

// const renderBody = (item, index) => (
//     <tr key={index}>
//         <td>{item.id}</td>
//         <td>{item.name}</td>
//         <td>{item.email}</td>
//         <td>{item.phone}</td>
//         <td>{item.total_orders}</td>
//         <td>{item.total_spend}</td>
//         <td>{item.location}</td>
//     </tr>
// )

// const Customers = () => {
//     return (
//         <div>
//             <h2 className="page-header">
//                 customers
//             </h2>
//             <div className="row">
//                 <div className="col-12">
//                     <div className="card">
//                         <div className="card__body">
//                             <Table
//                                 limit='10'
//                                 headData={customerTableHead}
//                                 renderHead={(item, index) => renderHead(item, index)}
//                                 bodyData={customerList}
//                                 renderBody={(item, index) => renderBody(item, index)}
//                             />
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default Customers
import { useMany } from "@pankod/refine-core";
import {
    List,
    useTable,
    useImport,
    ImportButton,
} from "@pankod/refine-antd";

export const Customers: React.FC = () => {
    const { tableProps } = useTable<IPost>();

    const categoryIds =
        tableProps?.dataSource?.map((item) => item.category.id) ?? [];
    const { data, isLoading } = useMany<ICategory>({
        resource: "categories",
        ids: categoryIds,
        queryOptions: {
            enabled: categoryIds.length > 0,
        },
    });
    type pageHeaderProps = {
        children: React.ReactNode; // 👈️ type children
      };

    const importProps = useImport<IPostFile>();

    return (
        <List
            pageHeaderProps={{
                extra: <ImportButton {...importProps} />,
            }}
        >
            ...
        </List>
    );
};

interface ICategory {
    id: number;
    title: string;
}

interface IPostFile {
    id: number;
    title: string;
    content: string;
    userId: number;
    categoryId: number;
    status: "published" | "draft" | "rejected";
}

interface IPost {
    id: number;
    title: string;
    content: string;
    status: "published" | "draft" | "rejected";
    category: { id: number };
}