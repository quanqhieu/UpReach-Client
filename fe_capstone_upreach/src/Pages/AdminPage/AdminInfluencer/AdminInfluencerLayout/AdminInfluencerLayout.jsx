import React from "react";
import "./AdminInfluencerLayout.css";

import {
  Table,
  Popconfirm,
  Form,
  Input,
  Typography,
  Spin,
  message,
} from "antd";
import {
  UserDeleteOutlined,
  EditOutlined,
  LockOutlined,
  UnlockOutlined,
} from "@ant-design/icons";
import axios from "axios";

const AdminInfluencerLayout = () => {
  const [messageApi, contextHolder] = message.useMessage();

  const [form] = Form.useForm();
  const [listInflu, setListInflu] = React.useState([]);

  const [editingId, setEditingId] = React.useState("");
  const [openConfirm, setOpenConfirm] = React.useState(false);
  const [force, setForce] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(true);
  const tags = [
    {
      title: "Full Name",
      dataIndex: "fullName",
      width: "14%",
      editable: true,
    },
    {
      title: "Age",
      dataIndex: "Age",
      width: "5%",
      editable: true,
    },
    {
      title: "Gender",
      dataIndex: "Gender",
      width: "6%",
      editable: true,
    },
    {
      title: "Relationship",
      dataIndex: "Relationship",
      width: "8%",
      editable: true,
    },
    {
      title: "Email",
      dataIndex: "Email",
      width: "20%",
      editable: true,
    },
    {
      title: "Phone Number",
      dataIndex: "Phone",
      width: "10%",
      editable: true,
    },
    {
      title: "Address",
      dataIndex: "Address",
      width: "20%",
      editable: true,
    },

    {
      title: <EditOutlined />,
      dataIndex: "edit",
      width: "12%",
      render: (_, record) => {
        const editable = isEditing(record);

        return editable ? (
          <span
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Typography.Link
              onClick={() => handleSave(record?.Profile_ID)}
              style={{
                marginRight: 8,
              }}
            >
              Save
            </Typography.Link>
            <Popconfirm
              open={openConfirm}
              title="Sure to cancel?"
              onCancel={cancel}
              onConfirm={ok}
            >
              <p
                style={{ cursor: "pointer", paddingTop: "3px  " }}
                onClick={async () => {
                  if (await check()) {
                    setOpenConfirm(true);
                  } else {
                    setEditingId("");
                  }
                }}
              >
                Cancel
              </p>
            </Popconfirm>
          </span>
        ) : (
          <Typography.Link
            disabled={editingId !== ""}
            onClick={() => edit(record)}
          >
            Edit
          </Typography.Link>
        );
      },
    },
    {
      title: <UserDeleteOutlined />,
      dataIndex: "lock",
      width: "5%",
      render: (_, record) =>
        listInflu?.length >= 1 && record?.isAccepted == false ? (
          <Popconfirm
            title="Sure to unlock account?"
            onConfirm={() => handleAllow(record?.Profile_ID)}
          >
            <LockOutlined />
          </Popconfirm>
        ) : (
          <Popconfirm
            title="Sure to lock account?"
            onConfirm={() => handleLock(record?.Profile_ID)}
          >
            <UnlockOutlined />
          </Popconfirm>
        ),
    },
  ];

  const check = async () => {
    if (editingId !== "") {
      const row = await form.validateFields();
      if (
        listInflu.some(
          (item) =>
            item?.Profile_ID == editingId && item?.fullName == row.fullName
        ) &&
        listInflu.some(
          (item) => item?.Profile_ID == editingId && item?.Age == row.Age
        ) &&
        listInflu.some(
          (item) => item?.Profile_ID == editingId && item?.Gender == row.Gender
        ) &&
        listInflu.some(
          (item) =>
            item?.Profile_ID == editingId &&
            item?.Relationship == row.Relationship
        ) &&
        listInflu.some(
          (item) => item?.Profile_ID == editingId && item?.Email == row.Email
        ) &&
        listInflu.some(
          (item) => item?.Profile_ID == editingId && item?.Phone == row.Phone
        ) &&
        listInflu.some(
          (item) =>
            item?.Profile_ID == editingId && item?.Address == row.Address
        )
      ) {
        return false;
      } else {
        return true;
      }
    }
  };

  const isEditing = (record) => {
    return record?.Profile_ID === editingId;
  };

  const EditableCell = ({
    editing,
    dataIndex,
    title,
    inputType,
    record,
    index,
    children,
    ...restProps
  }) => {
    const inputNode =
      inputType === "number" ? (
        <Input type="number" maxLength={11} />
      ) : (
        <Input />
      );

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
                // message: `Error!`,
                message: `Input ${title}!`,
              },
            ]}
          >
            {inputNode}
          </Form.Item>
        ) : (
          children
        )}
      </td>
    );
  };

  const edit = (record) => {
    form.setFieldsValue({
      fullnName: "",
      Age: "",
      Gender: "",
      Relationship: "",
      Email: "",
      Phone: "",
      Address: "",
      ...record,
    });
    setEditingId(record?.Profile_ID);
  };

  const cancel = () => {
    setOpenConfirm(false);
  };

  const ok = () => {
    setEditingId("");
    setOpenConfirm(false);
  };

  const handleSave = async (id) => {
    // setIsLoading(true);
    try {
      const row = await form.validateFields();
      const newInfoInflu = [...listInflu];
      const index = newInfoInflu.findIndex((item) => id === item?.Profile_ID);
      if (index > -1) {
        const item = newInfoInflu[index];
        newInfoInflu.splice(index, 1, {
          ...item,
          ...row,
        });

        setListInflu(newInfoInflu);
        setEditingId("");
      } else {
        newInfoInflu.push(row);
        setListInflu(newInfoInflu);
        setEditingId("");
      }

      const formData = new FormData();
      formData.append("influ", JSON.stringify(row));
      formData.append("influId", JSON.stringify(id));

      axios
        .put("http://localhost:4000/api/admin/edit-influ", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          messageApi.open({
            type: "success",
            content: response?.data.message,
          });
          setForce((prev) => prev + 1);
        })
        .catch((error) => {
          console.error("Lỗi khi cập nhật thông tin:", error);
        });
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };

  const mergedTags = tags?.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => {
        return {
          record,
          inputType: col.dataIndex === ("Phone" && "Age") ? "number" : "text",
          dataIndex: col.dataIndex,
          title: col.title,
          editing: isEditing(record),
        };
      },
    };
  });

  const handleAllow = (id) => {
    const formData = new FormData();
    formData.append("profileId", JSON.stringify(id));
    axios
      .put("http://localhost:4000/api/admin/unlock-influ", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        messageApi.open({
          type: "success",
          content: response?.data.message,
        });
        setForce((prev) => prev + 1);
      })
      .catch((error) => {
        console.error("Lỗi khi cập nhật thông tin:", error);
      });
  };

  const handleLock = (id) => {
    const formData = new FormData();
    formData.append("profileId", JSON.stringify(id));

    axios
      .put("http://localhost:4000/api/admin/lock-influ", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        messageApi.open({
          type: "success",
          content: response.data.message,
        });
        setForce((prev) => prev + 1);
      })
      .catch((error) => {
        console.error("Lỗi khi cập nhật thông tin:", error);
      });
  };

  React.useEffect(() => {
    setIsLoading(true);
    axios
      .get("http://localhost:4000/api/admin/get-influencer-account", {
        params: {
          // email: user.influencerEmail,
        },
      })
      .then((response) => {
        const info = response?.data.data;
        setListInflu(info);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error while fetching profile information:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [force]);

  return (
    <>
      {contextHolder}
      <div className="admin-influencer-layout">
        <div className="admin-influencer-list-layout">
          <div className="admin-influencer-table">
            <Form form={form} component={false}>
              <Spin tip="Loading" size="large" spinning={isLoading}>
                <Table
                  components={{
                    body: {
                      cell: EditableCell,
                    },
                  }}
                  columns={mergedTags}
                  dataSource={listInflu}
                  rowClassName="editable-row"
                  pagination={{
                    onChange: cancel,
                    pageSize: 12,
                  }}
                  size="large"
                />
              </Spin>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
};
export default AdminInfluencerLayout;
