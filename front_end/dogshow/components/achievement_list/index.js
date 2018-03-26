import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Table } from 'react-bootstrap'
import AchievementItem from './achievement_item'
import { connect } from 'react-redux';
import * as actions from '../../actions/achievement-actions';
class AchievementList extends Component {
    constructor(props) {
        super(props)
        this.renderRow = this.renderRow.bind(this)
    }
    render() {
        const { achievements: { allIds = [] } } = this.props;
        return (
            <Table striped responsive hover condensed >
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Dog</th>
                        <th>Round</th>
                        <th>Dog Class</th>
                        <th>Category</th>
                        <th>Rank</th>
                        <th>Score</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {allIds.map(this.renderRow)}
                </tbody>
            </Table>
        )
    }

    renderRow(id, idx) {
        const { achievements: { byId = {} } } = this.props
        const achievement = byId[id]
        return (
            <AchievementItem 
                key={idx}
                idx={idx} 
                id={id}
                achievement={achievement}
                onDelete={this.props.removeAchievement}
            />
        );
    }
}

AchievementList.propTypes = {
    achievements: PropTypes.object.isRequired
}

AchievementList.defaultProps = {
}
const mapStatetoProps = state => {
    return {

    }
}
const mapDispatchToProps = (dispatch, props) => {
    return {
        removeAchievement : achievement => {
            dispatch(actions.removeAchievement(achievement))
        }
    }
}
export default connect(mapStatetoProps, mapDispatchToProps)(AchievementList)
