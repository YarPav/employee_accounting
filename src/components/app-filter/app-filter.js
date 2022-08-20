import {Component} from "react";
import "./app-filter.css";

class AppFilter extends Component {
    onUpdateFilter = (e) => {
        const currentFilter = e.currentTarget.value;
        this.props.onUpdateFilter(currentFilter);
    }

    render() {
        return (
            <div className="btn-group">
                {this.props.filters.map(filter => {
                    const btnClass = this.props.currentFilter === filter.name
                        ? "btn-light"
                        : "btn-outline-light";
                    return (
                        <button type="button"
                                className={`btn ${btnClass}`}
                                value={filter.name}
                                onClick={this.onUpdateFilter}
                                key={filter.id}
                        >
                            {filter.title}
                        </button>
                    )
                })}
            </div>
        )
    }
}

export default AppFilter;