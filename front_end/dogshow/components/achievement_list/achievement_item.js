import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button } from 'react-bootstrap'
class AchievementItem extends Component {
    constructor(props) {
        super(props);
        this.onDelete = this.onDelete.bind(this);
    }
    
    onDelete(achievement) {
        this.props.onDelete(achievement)
    };
    render() {
        const { achievement, idx, id } = this.props;    
        return (
            <tr key={idx}>
                <th>
                    <Button href={`/achievements/${id}`} bsStyle={'link'}>
                        {idx + 1}
                    </Button>
                </th>
                <td>
                    <Button href={`/achievements/${id}`} bsStyle={'link'}>
                        {achievement.dog.name}
                    </Button>
                </td>
                <td>{achievement.round}</td>
                <td>{achievement.dogClass}</td>
                <td>{achievement.category}</td>
                <td>{achievement.rank}</td>
                <td>{achievement.score}</td>
                <td><Button 
                    type="button" 
                    className="btn btn-danger" 
                    onClick={() => this.onDelete(achievement)}
                >Delete</Button>&nbsp;
                <Button 
                    type="button" 
                    className="btn btn-warning"
                    
                >Edit</Button></td>
            </tr>
        )
    };
    
}



export default AchievementItem
