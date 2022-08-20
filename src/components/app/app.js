import {Component} from "react";

import AppInfo from '../app-info/app-info';
import SearchPanel from '../search-panel/search-panel';
import AppFilter from '../app-filter/app-filter';
import EmployeesList from '../employees-list/employees-list';
import EmployeesAddForm from '../employees-add-form/employees-add-form';

import './app.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                {
                    id: 1,
                    name: "John N.",
                    salary: 5500,
                    increase: false,
                    like: false
                },
                {
                    id: 2,
                    name: "Taylor S.",
                    salary: 4200,
                    increase: false,
                    like: false
                },
                {
                    id: 3,
                    name: "Alex M.",
                    salary: 7600,
                    increase: true,
                    like: true
                },
                {
                    id: 4,
                    name: "Bob J.",
                    salary: 700,
                    increase: true,
                    like: true
                }
            ],
            filters: [
                {
                    id: 1,
                    name: 'all',
                    title: 'Все сотрудники'
                },
                {
                    id: 2,
                    name: 'rising',
                    title: 'На повышение'
                },
                {
                    id: 3,
                    name: 'overThousand',
                    title: 'З/П больше 1000$'
                }
            ],
            searchString: '',
            currentFilter: 'all'
        };
    }

    deleteItem = (id) => {
        this.setState(({data}) => ({
            data: data.filter(item => item.id !== id)
        }));
    }
    addItem = (newEmployee) => {
        const employee = {
            id: this.state.data[this.state.data.length - 1].id + 1,
            name: newEmployee.name,
            salary: newEmployee.salary,
            increase: false,
            like: false
        };
        this.setState(({data}) => {
            const newData = data.slice();
            newData.push(employee);
            return {
                data: newData
            }
        });
    }

    onToggleProp = (id, prop) => {
        this.setState(({data}) => ({
            data: data.map(item => {
                if (item.id === id) {
                    return {...item, [prop]: !item[prop]}
                }
                return item;
            })
        }));
    }
    searchEmp = (items, searchString) => {
        if (searchString.length === 0) {
            return items;
        }
        return items.filter(item => item.name.toLowerCase().indexOf(searchString.toLowerCase()) > -1);
    }
    filterEmp = (items, currentFilter) => {
        switch (currentFilter) {
            case 'all':
                return items;
            case 'rising':
                return items.filter(item => item.like);
            case 'overThousand':
                return items.filter(item => item.salary >= 1000);
            default:
                return items;
        }
    }
    onUpdateSearch = (searchString) => {
        this.setState({searchString});
    }
    onUpdateFilter = (currentFilter) => {
        this.setState({currentFilter});
    }

    render() {
        const {data, searchString, currentFilter, filters} = this.state;
        const employeesCount = this.state.data.length,
            increasedEmployeesFilter = this.state.data.filter(employee => employee.increase).length,
            filteredData = this.filterEmp(data, currentFilter),
            visibleData = this.searchEmp(filteredData, searchString);
        return (
            <div className="app">
                <AppInfo
                    employeesCount={employeesCount}
                    increasedEmployeesCount={increasedEmployeesFilter}
                />
                <div className="search-panel">
                    <SearchPanel onUpdateSearch={this.onUpdateSearch}/>
                    <AppFilter
                        onUpdateFilter={this.onUpdateFilter}
                        currentFilter={currentFilter}
                        filters={filters}
                    />
                </div>
                <EmployeesList
                    data={visibleData}
                    onDelete={this.deleteItem}
                    onToggleProp={this.onToggleProp}
                />
                <EmployeesAddForm onAdd={this.addItem}/>
            </div>
        );
    }
}

export default App;
