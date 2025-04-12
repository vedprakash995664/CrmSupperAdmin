import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { FilterMatchMode } from "primereact/api";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { useNavigate } from "react-router-dom";
import Dashboard from "../Components/Dashboard";
import { Toast } from "primereact/toast";
import Swal from "sweetalert2";

export default function DeletedUser() {
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(false);
    const toast = useRef(null);
    const navigate = useNavigate();
    const APi_Url = import.meta.env.VITE_API_URL;

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`${APi_Url}/digicoder/crm/api/v1/admin/getall/`);
                if (Array.isArray(response.data.admins)) {
                    setEmployees(response.data.admins);
                } else {
                    toast.current?.show({
                        severity: "error",
                        summary: "Error",
                        detail: "Fetched data is not an array",
                        life: 3000,
                    });
                }
            } catch (error) {
                toast.current?.show({
                    severity: "error",
                    summary: "Error",
                    detail: "Failed to fetch users",
                    life: 3000,
                });
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        phone: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        priority: { value: null, matchMode: FilterMatchMode.EQUALS },
        source: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    });

    const [globalFilterValue, setGlobalFilterValue] = useState("");
    const [first, setFirst] = useState(0);
    const [rows, setRows] = useState(5);

    const onGlobalFilterChange = (e) => {
        const value = e.target.value;
        let _filters = { ...filters };
        _filters["global"].value = value;
        setFilters(_filters);
        setGlobalFilterValue(value);
    };

    const onPageChange = (event) => {
        setFirst(event.first);
        setRows(event.rows);
    };

    const [finalEmployee, setFinalEmployee] = useState([]);

    useEffect(() => {
        const data = employees.filter((item) => item.blocked === true);
        setFinalEmployee(data);
    }, [employees]);

    const renderHeader = () => (
        <div className="flex justify-content-between gap-3 align-items-center p-2">
            <h3>Blocked User Details</h3>
            <div>
                <InputText
                    value={globalFilterValue}
                    onChange={onGlobalFilterChange}
                    placeholder="Keyword Search"
                    style={{ width: "100%", maxWidth: "200px", marginRight: "10px" }}
                />
            </div>
        </div>
    );

    const handleView = (rowData) => {
        navigate("userFullPage", { state: { viewdata: rowData } });
    };

    const handleUnblock = async (rowData) => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: "You want to unblock this user?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, unblock it!'
        });

        if (result.isConfirmed) {
            try {
                await axios.put(`${APi_Url}/digicoder/crm/api/v1/admin/unblock/${rowData._id}`);
                setEmployees(employees.filter((user) => user._id !== rowData._id));
                toast.current?.show({
                    severity: "success",
                    summary: "Unblocked",
                    detail: "User unblocked successfully",
                    life: 3000,
                });
            } catch (error) {
                toast.current?.show({
                    severity: "error",
                    summary: "Error",
                    detail: "Failed to unblock user",
                    life: 3000,
                });
            }
        }
    };

    const actionBodyTemplate = (rowData) => (
        <div className="flex justify-content-around gap-3">
            <button
                onClick={() => handleView(rowData)}
                style={{
                    borderRadius: "50%",
                    border: "none",
                    height: "40px",
                    width: "40px",
                    backgroundColor: "#EDF1FF",
                    color: "#3454D1",
                    fontSize: "20px",
                    cursor: "pointer",
                }}
            >
                <i className="ri-eye-line"></i>
            </button>
            <button
                onClick={() => handleUnblock(rowData)}
                style={{
                    borderRadius: "50%",
                    border: "none",
                    height: "40px",
                    width: "40px",
                    backgroundColor: "#EDF1FF",
                    color: "#4CAF50",
                    fontSize: "20px",
                    cursor: "pointer",
                }}
            >
                <i className="ri-lock-unlock-fill"></i>
            </button>
        </div>
    );

    return (
        <Dashboard>
            <div className="card">
                <Toast ref={toast} />
                <DataTable
                    value={finalEmployee}
                    rows={rows}
                    first={first}
                    paginator
                    dataKey="id"
                    filters={filters}
                    filterDisplay="row"
                    globalFilterFields={["name", "email", "mobile", "companyName", "companyType", "street", "city", "state", "country"]}
                    header={renderHeader()}
                    emptyMessage="No blocked users found."
                    onPage={onPageChange}
                    paginatorTemplate=" PrevPageLink PageLinks NextPageLink "
                    removableSort
                    loading={loading}
                    style={{ borderRadius: "10px" }}
                >
                    <Column
                        header="SR No"
                        body={(rowData, { rowIndex }) => (
                            <div className="flex align-items-center gap-3">
                                {rowIndex + 1}
                            </div>
                        )}
                        style={{ width: "10%" }}
                    />
                    <Column field="name" header="NAME" sortable style={{ width: "15%" }} />
                    <Column field="email" header="EMAIL" sortable style={{ width: "15%" }} />
                    <Column field="mobile" header="MOBILE" sortable style={{ width: "15%" }} />
                    <Column field="companyName" header="COMPANY NAME" style={{ width: "10%", textAlign: "center" }} />
                    <Column field="companyType" header="COMPANY TYPE" style={{ width: "20%" }} />
                    <Column header="ACTION" body={actionBodyTemplate} style={{ width: "15%" }} />
                </DataTable>
            </div>
        </Dashboard>
    );
}