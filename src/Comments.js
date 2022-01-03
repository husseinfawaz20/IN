// import React, { useState, useEffect } from "react";
// import Axios from "axios";
// import { Table, Input, Button, Space } from "antd";
// import { SearchOutlined } from "@ant-design/icons";

// function Comments() {
//   const [data, setData] = useState([]);
//   const [loading, setloading] = useState(true);

//   const [state, setState] = useState({
//     searchText: "",
//     searchedColumn: "",
//   });

//   useEffect(() => {
//     getData();
//   }, []);

//   const getData = async () => {
//     await Axios.get("https://jsonplaceholder.typicode.com/comments").then(
//       (res) => {
//         setloading(false);
//         setData(
//           res.data.map((row, index) => ({
//             //used index incase of multiple data items
//             key: index,
//             Name: row.name,
//             Email: row.email,
//             id: row.id,
//             body: row.body,
//           }))
//         );
//       }
//     );
//   };

//   const handleSearch = (selectedKeys, confirm, dataIndex) => {
//     confirm();
//     setState({
//       searchText: selectedKeys[0],
//       searchedColumn: dataIndex,
//     });
//   };

//   const handleReset = (clearFilters) => {
//     clearFilters();
//     setState({ searchText: "" });
//   };
  
//   const getColumnSearch = (dataIndex) => ({
//     filterDropdown: ({
//       setSelectedKeys,
//       selectedKeys,
//       confirm,
//       clearFilters,
//     }) => (
//       <div style={{ padding: 8 }}>
//         <Input
//           placeholder={`Search ${dataIndex}`}
//           value={selectedKeys[0]}
//           onChange={(e) =>
//             setSelectedKeys(e.target.value ? [e.target.value] : [])
//           }
//           onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
//           style={{ marginBottom: 8, display: "block" }}
//         />
//         <Space>
//           <Button
//             type="primary"
//             onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
//             icon={<SearchOutlined />}
//             size="small"
//             style={{ width: 90 }}
//           >
//             Search
//           </Button>
//           <Button
//             onClick={() => handleReset(clearFilters)}
//             size="small"
//             style={{ width: 90 }}
//           >
//             Reset
//           </Button>
//         </Space>
//       </div>
//     ),
//     filterIcon: (filtered) => (
//       <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
//     ),

//     onFilter: (value, record) =>
//       record[dataIndex]
//         ? record[dataIndex]
//             .toString()
//             .toLowerCase()
//             .includes(value.toLowerCase())
//         : "",
//   });

 

//   const columns = [
//     {
//       title: "#",
//       dataIndex: "id",
//       width: 35,
//       sorter: (a, b) => Number(a.id) - Number(b.id),
//       // sortDirections: ['descend'],
//     },

//     {
//       title: "Name",
//       dataIndex: "Name",
//       width: 150,
//       filterSearch: true,
//       sorter: (a, b) => a.Name.length - b.Name.length,
//       ...getColumnSearch("Name"),
//     },
//     {
//       title: "Email",
//       dataIndex: "Email",
//       width: 100,
//       sorter: (a, b) => a.Email.length - b.Email.length,
//       ...getColumnSearch("Email"),

//       //sortDirections: ['descend'],
//     },
//     {
//       title: "Comment",
//       dataIndex: "body",
//       width: 250,

//       //finding the name started with `value`
//       ...getColumnSearch("body"),
//       sorter: (a, b) => a.body.length - b.body.length,
//       // sortDirections: ['descend'],
//     },
//   ];

//   return (
//     <div>
//       {loading ? (
//         "Loading"
//       ) : (
//         <>
//           <h1>Comments</h1>
//           <Table
//             columns={columns}
//             dataSource={data}
//             pagination={{ pageSize: 20, hideOnSinglePage: true }}
//             scroll={{ y: 500 }}
//           />
//         </>
//       )}
//     </div>
//   );
// }

// export default Comments;




import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Table, Popconfirm, Button, Space, Form, Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
 import { isEmpty } from "lodash";

const Comments = () => {
  const [gridData, setGridData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingKey, setEditingKey] = useState("");
  const [sortedInfo, setSortedInfo] = useState({});
  const [searchText, setSearchText] = useState("");
  const [searchGlobalText, setSearchGlobalText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");

  const searchInput = useRef(null);
  const [form] = Form.useForm();
  let [filteredData] = useState();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/comments"
    );
    setGridData(response.data);
    setLoading(false);
  };

  const handleDelete = (value) => {
    const dataSource = [...modifiedData];
    const filteredData = dataSource.filter((item) => item.id !== value.id);
    setGridData(filteredData);
  };

  const handleChange = (...sorter) => {
     const { order, field } = sorter[2];
    setSortedInfo({ columnKey: field, order });
  };

  ///GLOBAL SEARCH///

  const handleGlobalSearch = (e) => {
    setSearchGlobalText(e.target.value);
    if (e.target.value === "") {
      loadData();
    }
  };

  const globalSearch = () => {
    filteredData = modifiedData.filter((value) => {
      return (
        value.name
          .toString()
          .toLowerCase()
          .includes(searchGlobalText.toString().toLowerCase()) ||
        value.email
          .toString()
          .toLowerCase()
          .includes(searchGlobalText.toString().toLowerCase()) ||
        value.comment
          .toString()
          .toLowerCase()
          .includes(searchGlobalText.toString().toLowerCase())
      );
    });
    setGridData(filteredData);
  };

  ///INDIVIDUAL COLUMN SEARCH///

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex]
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase())
        : "",
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(
          () =>
            searchInput && searchInput.current && searchInput.current.select(),
          100
        );
      }
    },
    
  });

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };

  ///INDIVIDUAL COLUMN SEARCH ENDS///

  const save = async (key) => {
    try {
      const row = await form.validateFields();
      const newData = [...modifiedData];
      const index = newData.findIndex((item) => key === item.key);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
        setGridData(newData);
        setEditingKey("");
      }
    } catch (error) {
      console.log("Error", error);
    }
  };

  const edit = (record) => {
    form.setFieldsValue({
      name: "",
      email: "",
      comment: "",
      ...record,
    });
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey("");
  };

  const clearAll = () => {
    setSortedInfo({});
    setSearchGlobalText("");
    loadData();
  };

  //change one components name to another ("body" => "comment")
  const modifiedData = gridData.map(({ body, ...item }) => ({
    ...item,
    key: item.id,
    comment: isEmpty(body) ? item.comment : body,
  }));

  const isEditing = (record) => {
    return record.key === editingKey;
  };

  const EditableCell = ({
    editing,
    dataIndex,
    title,
    record,
    children,
    ...restProps
  }) => {
    const input = <Input />;
    return (
      <td {...restProps}>
        {editing ? (
          <Form.Item
            name={dataIndex}
            style={{
              margin: 0,
            }}
            rules={[
              {
                required: true,
                message: `${title} required!`,
              },
            ]}
          >
            {input}
          </Form.Item>
        ) : (
          children
        )}
      </td>
    );
  };

  ///RENDER THE COLUMNS///

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      width: "1%",
    },
    {
      title: "Name",
      dataIndex: "name",
      width: "30%",
      editable: true,
      sorter: (a, b) => a.name.length - b.name.length,
      sortOrder: sortedInfo.columnKey === "name" && sortedInfo.order,
      ...getColumnSearchProps("name"),
    },
    {
      title: "Email",
      dataIndex: "email",
      width: "20%",
      editable: true,
      sorter: (a, b) => a.email.length - b.email.length,
      sortOrder: sortedInfo.columnKey === "email" && sortedInfo.order,
      ...getColumnSearchProps("email"),
    },
    {
      title: "Comment",
      dataIndex: "comment",
      width: "40%",
      editable: true,
      sorter: (a, b) => a.comment.length - b.comment.length,
      sortOrder: sortedInfo.columnKey === "comment" && sortedInfo.order,
      ...getColumnSearchProps("comment"),
    },
    {
      title: "Actions",
      dataIndex: "actions",
      width: "9%",
      render: (_, record) => {
        const editable = isEditing(record);
        return modifiedData.length >= 1 ? (
          <Space>
            <Popconfirm
              title="Are you sure you want to delete?"
              onConfirm={() => handleDelete(record)}
            >
              <Button type="primary" disabled={editable} danger>
                Delete
              </Button>
            </Popconfirm>
            {editable ? (
              <span>
                <Space size="middle">
                  <Button
                    onClick={(e) => save(record.key)}
                    type="primary"
                    style={{ marginRight: 8 }}
                  >
                    Save
                  </Button>
                  <Popconfirm
                    title="Are you sure you want to exit without saving?"
                    onConfirm={cancel}
                    okText="Yes"
                    cancelText="No"
                  >
                    <Button>Cancel</Button>
                  </Popconfirm>
                </Space>
              </span>
            ) : (
              <Button onClick={() => edit(record)} type="primary">
                Edit
              </Button>
            )}
          </Space>
        ) : null;
      },
    },
  ];

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  return (
    <div>
      <div className="space">
        <Space align="center">
          <Input.Search
            placeholder="input search text"
            onChange={handleGlobalSearch}
            value={searchGlobalText}
            onSearch={globalSearch}
            allowClear
          />
          <Button onClick={clearAll}>Clear All</Button>
        </Space>
      </div>
      <Form form={form} component={false}>
        <Table
          components={{
            body: {
              cell: EditableCell,
            },
          }}
          className="table"
          columns={mergedColumns}
          dataSource={
            filteredData && filteredData.length ? filteredData : modifiedData
          }
          bordered
          loading={loading}
          onChange={handleChange}
         pagination={{hideOnSinglePage: true , pageSize:20}}
        />
      </Form>
    </div>
  );
};

export default Comments;

