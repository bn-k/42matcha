import React from "react";
import {withRouter} from "react-router-dom"
import {connect} from "react-redux";
import {
    Segment,
    Header,
    Button,
    Dropdown,
    Grid, Icon,
} from 'semantic-ui-react';
import Slider, { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';
import {getPeopleAction, sortPeople, updateFiltersAction} from "../redux/action/people-action";
import {peoplePreloaded} from "../redux/store/preloaded-state-store";
import _ from 'lodash';
import Tooltip from 'rc-tooltip';
import {SORT_AGE, SORT_LOCALISATION} from "../redux/action/types-action";

const Handle = Slider.Handle;
const handle = (props, unit) => {
    const { value, dragging,  index, ...restProps} = props;
    return (
        <Tooltip
            prefixCls="rc-slider-tooltip"
            overlay={value}
            visible={dragging}
            placement="top"
            key={index}
        >
            <Handle value={value} {...restProps} />
        </Tooltip>
    );
};

const options = [
    { key: 1, text: 'Age', value: 1 },
    { key: 2, text: 'Localisation', value: 2 },
    { key: 3, text: 'Score', value: 3 },
    { key: 4, text: 'Tags', value: 4 },
];

class GallerySettings extends React.Component {
    constructor(props) {
        super(props);
        this.zut = this.zut.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            sort : null,
            newtag: "",
            tags: []
        };
        this.applyFilters = this.applyFilters.bind(this);
    }
    zut(r, name) {
        let filters = this.props.people.filters;
        filters[name] = r;
    }
    intervalCol(name, step, unit, max) {
        return (
            <Grid.Column mobile={16} tablet={16} computer={5}>
                <Header as={'h4'}>{_.startCase(name)}</Header>
                <Range
                    unit={unit}
                    allowCross={false}
                    defaultValue={[this.props.people.filters[name][0], max]}
                    onChange={r => this.zut(r, name)}
                    min={peoplePreloaded.filters[name][0]}
                    max={max}
                    step={step}
                    style={{border: 'black'}}
                    trackStyle={[{ backgroundColor: 'black'}, { backgroundColor: 'black'}]}
                    handleStyle={[{ backgroundColor: 'white' , borderColor: 'red' }, { backgroundColor: 'white' , borderColor: 'red' }]}
                    railStyle={{ backgroundColor: 'gray'}}
                    handle={handle}
                />
            </Grid.Column>
        )
    }
    handleSortChange = (e, data) => {
        this.setState({sort: data.value});
        switch (data.value) {
            case 1:
                this.props.dispatch(sortPeople(this.props.people, SORT_AGE, this.props.app.user));
                break;
            case 2:
                this.props.dispatch(sortPeople(this.props.people, SORT_LOCALISATION, this.props.app.user));
                break;
            default:
                break;
        }
    };
    handleTagsChange = (e, data) => {
        let filters = this.props.people.filters;
        filters[data.name] = data.value;
        this.props.dispatch(updateFiltersAction(this.props.people, filters));
    };
    applyFilters (e) {
        let filters = this.props.people.filters;
        this.props.dispatch(getPeopleAction(filters, "true"));
    }
    handleChange = (e, data) => {
        this.setState({[data.name]: data.value});
    };
    render () {
        return (
            <Segment>
                <Grid>
                    <Grid.Row columns={4}>
                        <Grid.Column style={{paddingTop: "4px"}} mobile={16} tablet={16} computer={1}>
                            <Button fluid onClick={this.props.toggle}><Icon link name='close' /></Button>
                        </Grid.Column>
                        {this.intervalCol("age", 1, "years", this.props.people.filters["age"][1])}
                        {this.intervalCol("score", 1, "", this.props.people.filters["score"][1])}
                        {this.intervalCol("location", 10, "km", 1000)}
                    </Grid.Row>
                    <Header as={'h4'}>Tags</Header>
                    <Grid.Row columns={3}>
                        <Grid.Column mobile={16} tablet={16} computer={9}>
                            <Dropdown
                                placeholder='Tags'
                                fluid
                                search
                                multiple
                                selection
                                options={this.props.app.tagList}
                                value={this.props.people.filters.tags}
                                name={"tags"}
                                onChange={this.handleTagsChange}
                            />
                        </Grid.Column>
                        <Grid.Column mobile={16} tablet={16} computer={3}>
                            <Button fluid color={"green"} onClick={e => this.applyFilters(e)}>Apply Filters</Button>
                        </Grid.Column>
                        <Grid.Column mobile={16} tablet={16} computer={4}>
                            <Grid.Row>
                                    <p>Sort by</p>
                            </Grid.Row>
                            <Grid.Row>
                                <Dropdown
                                    clearable
                                    options={options}
                                    value={this.state.sort}
                                    onChange={this.handleSortChange}
                                />
                            </Grid.Row>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Segment>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        people: state.people,
        app: state.app,
    };
};

export default withRouter(connect(mapStateToProps)(GallerySettings))
