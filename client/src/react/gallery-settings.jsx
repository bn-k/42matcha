import React from "react";
import {withRouter} from "react-router-dom"
import {connect} from "react-redux";
import {
    Divider,
    Segment,
    Container,
    Header,
    Button,
    ButtonGroup,
    Dropdown,
    Responsive,
    Grid,
    Form,
    Input,
    Card,
    Icon,
    Image,
} from 'semantic-ui-react';
import Slider, { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';
import {getPeopleAction, updateFiltersAction} from "../redux/action/people-action";
import {peoplePreloaded} from "../redux/store/preloaded-state-store";
import _ from 'lodash';
import {userAction} from "../redux/action/app-action";
import Tooltip from 'rc-tooltip';

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

class GallerySettings extends React.Component {
    constructor(props) {
        super(props);
        this.zut = this.zut.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            newtag: "",
            tags: []
        };
        this.applyFilters = this.applyFilters.bind(this);
        props.dispatch(userAction(props.app));
    }
    zut(r, name) {
        let filters = this.props.people.filters;
        filters[name] = r;
    }
    intervalCol(name, step, unit) {
        return (
            <Grid.Column mobile={16} tablet={16} computer={5}>
                <Header as={'h4'}>{_.startCase(name)}</Header>
                <Range
                    unit={unit}
                    allowCross={false}
                    defaultValue={[this.props.people.filters[name][0], this.props.people.filters[name][1]]}
                    onChange={r => this.zut(r, name)}
                    min={peoplePreloaded.filters[name][0]}
                    max={peoplePreloaded.filters[name][1]}
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
    handleTagsChange = (e, data) => {
        let filters = this.props.people.filters;
        filters[data.name] = data.value;
        this.props.dispatch(updateFiltersAction(this.props.people, filters));
    };
    applyFilters (e) {
        let filters = this.props.people.filters;
        this.props.dispatch(getPeopleAction(filters));
    }
    handleChange = (e, data) => {
        this.setState({[data.name]: data.value});
    };
    addNewTag = () => {
        const val = this.state.newtag;
        // options.unshift({ key: val, text: "#" + _.startCase(_.toLower(val)), value: val});
    };
    render () {
        return (
            <Segment>
                <Grid>
                    <Grid.Row columns={3}>
                        {this.intervalCol("age", 1, "years")}
                        {this.intervalCol("score", 1, "")}
                        {this.intervalCol("location", 50, "km")}
                    </Grid.Row>
                    <Header as={'h4'}>Tags</Header>
                    <Grid.Row columns={3}>
                        <Grid.Column mobile={16} tablet={16} computer={12}>
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
                        <Grid.Column mobile={16} tablet={16} computer={4}>
                            <Button fluid color={"green"} onClick={e => this.applyFilters(e)}>Apply Filters</Button>
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
