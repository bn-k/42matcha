import React from "react";
import {withRouter} from "react-router-dom"
import {connect} from "react-redux";
import "pure-react-carousel/dist/react-carousel.es.css";
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
import {getPeopleAction} from "../redux/action/people-action";
import {peoplePreloaded} from "../redux/store/preloaded-state-store";
import _ from 'lodash';

let options = [
    { key: 'angular', text: '#Angular', value: 'angular' },
    { key: 'css', text: '#CSS', value: 'css' },
    { key: 'design', text: 'Graphic Design', value: 'design' },
    { key: 'ember', text: 'Ember', value: 'ember' },
    { key: 'html', text: 'HTML', value: 'html' },
    { key: 'ia', text: 'Information Architecture', value: 'ia' },
    { key: 'javascript', text: 'Javascript', value: 'javascript' },
    { key: 'mech', text: 'Mechanical Engineering', value: 'mech' },
    { key: 'meteor', text: 'Meteor', value: 'meteor' },
    { key: 'node', text: 'NodeJS', value: 'node' },
    { key: 'plumbing', text: 'Plumbing', value: 'plumbing' },
    { key: 'python', text: 'Python', value: 'python' },
    { key: 'rails', text: 'Rails', value: 'rails' },
    { key: 'react', text: 'React', value: 'react' },
    { key: 'repair', text: 'Kitchen Repair', value: 'repair' },
    { key: 'ruby', text: 'Ruby', value: 'ruby' },
    { key: 'ui', text: 'UI Design', value: 'ui' },
    { key: 'ux', text: 'User Experience', value: 'ux' },
];

class GallerySettings extends React.Component {
    constructor(props) {
        super(props);
        this.zut = this.zut.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            newtag: "",
            tags: []
        };
    }
    zut(r, name) {
        let filters = this.props.people.filters;
        filters[name] = r;
        this.props.dispatch(getPeopleAction(filters));
    }
    intervalCol(name, step) {
        return (
            <Grid.Column>
                <Header as={'h4'}>{_.startCase(name)}</Header>
                <Range
                    allowCross={false}
                    defaultValue={[peoplePreloaded.filters[name][0], peoplePreloaded.filters[name][1]]}
                    onChange={r => this.zut(r, name)}
                    min={peoplePreloaded.filters[name][0]}
                    max={peoplePreloaded.filters[name][1]}
                    step={step}
                    style={{border: 'black'}}
                    trackStyle={[{ backgroundColor: 'black'}, { backgroundColor: 'black'}]}
                    handleStyle={[{ backgroundColor: 'white' , borderColor: 'red' }, { backgroundColor: 'white' , borderColor: 'red' }]}
                    railStyle={{ backgroundColor: 'gray'}}
                />
            </Grid.Column>
        )
    }
    handleTagsChange = (e, data) => {
        let filters = this.props.people.filters;
        filters[data.name] = data.value;
        this.props.dispatch(getPeopleAction(filters));
    };
    handleChange = (e, data) => {
        this.setState({[data.name]: data.value});
    };
    addNewTag = () => {
        const val = this.state.newtag;
        options.unshift({ key: val, text: "#" + _.startCase(_.toLower(val)), value: val});
        console.log(options);
    };
    render () {
        return (
            <Segment>
                <Grid>
                    <Grid.Row columns={3}>
                        {this.intervalCol("age", 1)}
                        {this.intervalCol("score", 0.5)}
                        {this.intervalCol("location", 50)}
                    </Grid.Row>
                    <Grid.Row columns={3}>
                        <Grid.Column width={1}>
                            <Header as={'h4'}>Tags</Header>
                        </Grid.Column>
                        <Grid.Column width={10}>
                            <Dropdown
                                placeholder='Tags'
                                fluid
                                search
                                multiple
                                selection
                                options={options}
                                value={this.props.people.filters.tags}
                                name={"tags"}
                                onChange={this.handleTagsChange}
                            />
                        </Grid.Column>
                        <Grid.Column width={3}>
                            <Input
                                icon='tags'
                                iconPosition='left'
                                label={{
                                    tag: true,
                                    content: 'Add Tag',
                                    onClick: this.addNewTag,
                                }}
                                labelPosition='right'
                                placeholder='Enter tags'
                                value={this.state.newtag}
                                name={"newtag"}
                                onChange={this.handleChange}
                            />
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
    };
};

export default withRouter(connect(mapStateToProps)(GallerySettings))
