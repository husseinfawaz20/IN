import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Table,
  Input,
  Button,
  Space,
  Modal,
  Form,
  Popconfirm,
  Badge,
} from "antd";
import { SearchOutlined } from "@ant-design/icons";

 
const client = axios.create({
  baseURL: `https://jsonplaceholder.typicode.com/users/`,
});

const Users = ({ resourceName }) => {
  const [data, setData] = useState([]);
  const [loading, setloading] = useState(true);
  const [isediting, setisediting] = useState(false);
  const [editingKey, setEditingKey] = useState("");
  const [form] = Form.useForm();

  const [state, setState] = useState({
    searchText: "",
    searchedColumn: "",
  });
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    await client.get().then((res) => {
      setloading(false);
      setData(
        res.data.map((row, index) => ({
          //used index incase of multiple data items
          key: index,
          Name: row.name,
          Email: row.email,
          Username: row.username,
          id: row.id,
          company: row.company.name,
          phone:row.phone,  
          address:row.address.city,
          website:row.website 
        }))
      );
    });
  };

  const handleEdit = (record) => {
    setisediting(true);
    setEditingKey({ ...record });
  };

  const handleDelete = (value) => {
    const dataSource = [...data];
    const filteredData = dataSource.filter((item) => item.id !== value.id);
    setData(filteredData);
  };

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setState({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex,
    });
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setState({ searchText: "" });
  };

 

  const getColumnSearch = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
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
  });

  const columns = [
    {
      title: "#",
      dataIndex: "id",
      width: 50,
      sorter: (a, b) => Number(a.id) - Number(b.id),
      // sortDirections: ['descend'],
    },

    {
      title: "Name",
      dataIndex: "Name",
      width: 150,
      sorter: (a, b) => a.Name.length - b.Name.length,

      ...getColumnSearch("Name"),
    },
    {
      title: "Email",
      dataIndex: "Email",
      width: 150,
      sorter: (a, b) => a.Email.length - b.Email.length,
      ...getColumnSearch("Email"),
    },
    {
      title: "Username",
      dataIndex: "Username",
      width: 150,
      sorter: (a, b) => a.Username.length - b.Username.length,

      ...getColumnSearch("Username"),
    },
    {
      title: "Actions",
      dataIndex: "actions",
      width: "9%",
      render: (_, record) => {
        return (
          <Space>
            <Button onClick={() => handleEdit(record)} type="primary">
              Edit
            </Button>
            <Popconfirm
              title="Are you sure you want to delete?"
              onConfirm={() => handleDelete(record)}
            >
              <Button type="primary" danger>
                Delete
              </Button>
            </Popconfirm>
          </Space>
        );
      },
    },
  ];

  const expandedRowRender = () => {
    const columns = [
      { title: "Company Name", dataIndex: "company", key: "company" },
      { title: "Address", dataIndex: "address", key: "address" },
      { title: "Website", dataIndex: "website", key: "website" },

      { title: "Status",dataIndex:"status", key: "status",
        render: () => (
          <span>
            <Badge status="success" />
          </span>
        ),
      },
    ];
    const newdata = [];
      newdata.push({
        company: [data[1].company],
        address: [data[2].address],
        website: [data[3].website],
      });
    return <Table columns={columns} dataSource={newdata} pagination={false} />;
  };

  const handleAdd=()=>{
    const newUser = {
      Name: "Name",
      Email: "Email",
      Username: "Username",
      id: (data.length +1), 
    }
    setData(pre=>{
      return[...pre, newUser]
    })
  }

  return (
    <div>
      {loading ? (
        "Loading"
      ) : (
        <>
          <h1>Users</h1>
          <Form form={form} component={false}>
            <Button style={{float: "right"}} onClick={handleAdd}>Add new User</Button>
            <Table
              className="table"
              columns={columns}
              dataSource={data}
              bordered
              expandable={{ expandedRowRender }}
              loading={loading}
              pagination={{ hideOnSinglePage: true, pageSize: 200 }}
            />
            <Modal
              title="Edit User"
              visible={isediting}
              onCancel={() => setisediting(false)}
              onOk={() => {
                setData((pre) => {
                  return pre.map((i) => {
                    if (i.id === editingKey.id) {
                      return editingKey;
                    } else {
                      return i;
                    }
                  });
                });
                setisediting(false);
              }}
            >
              <h4 style={{ marginBottom: "20px", marginTop: "20px" }}>Name</h4>
              <Input
                value={editingKey?.Name}
                onChange={(e) => {
                  setEditingKey((i) => {
                    return { ...i, Name: e.target.value };
                  });
                }}
              />
              <h4 style={{ marginBottom: "20px", marginTop: "30px" }}>
                Username
              </h4>
              <Input
                value={editingKey.Username}
                onChange={(e) => {
                  setEditingKey((i) => {
                    return { ...i, Username: e.target.value };
                  });
                }}
              />
              <h4 style={{ marginBottom: "20px", marginTop: "30px" }}>Email</h4>

              <Input
                value={editingKey.Email}
                onChange={(e) => {
                  setEditingKey((i) => {
                    return { ...i, Email: e.target.value };
                  });
                }}
              />
            </Modal>
          </Form>
        </>
      )}
    </div>
  );
};

export default Users;
