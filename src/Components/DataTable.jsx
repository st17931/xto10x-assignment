import React, { useState } from 'react';
import data from '../assets/data.json';
import hamburger from "../assets/Hamburger-menu.png"

const DataTable = () => {
    const [tableData, setTableData] = useState(data);
    const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
    const [filterQuery, setFilterQuery] = useState({
        filterColumn: "id",
        filterText: ""
    });
    const [paginationData, setPaginationData] = useState({
        start: 0,
        end: 10
    });
    const [hamburgerDropdownOpen, setHamburgerDropdownOpen] = useState(false)

    console.log("filterQuery object is", filterQuery);
    // Handle pagination previous
    const handlePrevious = () => {
        if (paginationData.start === 0) return;
        setPaginationData({
            ...paginationData,
            start: paginationData.start - 10,
            end: paginationData.end - 10
        });
    };

    // Handle pagination next
    const handleNext = () => {
        if (paginationData.end >= filteredData.length) return;
        setPaginationData({
            ...paginationData,
            start: paginationData.start + 10,
            end: paginationData.end + 10
        });
    };

    // Handle sorting
    const sortTable = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }

        const sortedData = [...tableData].sort((a, b) => {
            if (a[key] < b[key]) return direction === 'ascending' ? -1 : 1;
            if (a[key] > b[key]) return direction === 'ascending' ? 1 : -1;
            return 0;
        });

        setTableData(sortedData);
        setSortConfig({ key, direction });
    };

    // Handle filtering
    const filteredData = filterQuery.filterText
        ? tableData.filter(item => {
            const columnValue = item[filterQuery.filterColumn];
            console.log("column is", columnValue)

            // Handle case for strings
            if (typeof columnValue === 'string') {
                return columnValue.toLowerCase().includes(filterQuery.filterText.toLowerCase());
            }

            // Handle case for numbers or other types
            return columnValue.toString().includes(filterQuery.filterText);
        })
        : tableData; // If no filter text, return all data


    console.log("filterData", filteredData)

    return (
        <div className="table-container">
            <div className='firstSection'>
                <div className='dataTable'>DataTable</div>
                <div className='forDesktop'>
                    <input
                        type="text"
                        placeholder="Filter by column..."
                        value={filterQuery.filterText}
                        onChange={e => setFilterQuery({
                            ...filterQuery,
                            filterText: e.target.value
                        })}
                    />
                    <select
                        name="filterOptions"
                        value={filterQuery.filterColumn}
                        onChange={e => setFilterQuery({
                            ...filterQuery,
                            filterColumn: e.target.value
                        })}
                    >
                        {tableData.length > 0 && Object.keys(tableData[0]).map((header) => {
                            return <option value={header}>{header.toUpperCase()}</option>
                        })}
                    </select>
                </div>
                <div 
                className='forMobileHamburgerMenu'
                onClick={()=> setHamburgerDropdownOpen(!hamburgerDropdownOpen)}
                >
                    <img className="ham" src={hamburger} />
                </div>
            </div>

            {hamburgerDropdownOpen && <div className='forMobile'>
                <input
                    type="text"
                    placeholder="Filter by column..."
                    value={filterQuery.filterText}
                    onChange={e => setFilterQuery({
                        ...filterQuery,
                        filterText: e.target.value
                    })}
                />
                <select
                    name="filterOptions"
                    value={filterQuery.filterColumn}
                    onChange={e => setFilterQuery({
                        ...filterQuery,
                        filterColumn: e.target.value
                    })}
                >
                    {tableData.length > 0 && Object.keys(tableData[0]).map((header) => {
                        console.log("header is", header);
                        return <option value={header}>{header.toUpperCase()}</option>
                    })}
                </select>
            </div>}

            <div className='tableWrapper'>
                <table className="table">
                    <thead>
                        <tr>
                            {tableData.length > 0 && Object.keys(tableData[0]).map((header) => {
                            return <th onClick={() => sortTable(header)}>{header.toUpperCase()}</th>
                        })}
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData.slice(paginationData.start, paginationData.end).map((item, index) => (
                            <tr key={index}>
                                <td>{item.id}</td>
                                <td>{item.name}</td>
                                <td>{item.date}</td>
                                <td>{item.status}</td>
                                <td>{item.amount}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="pagination">
                <button className="btn" onClick={handlePrevious}>Previous</button>
                <button className="btn" onClick={handleNext}>Next</button>
            </div>
        </div>
    );
};

export default DataTable;
