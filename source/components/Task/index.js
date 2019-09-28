// Core
import React, { PureComponent, createRef } from 'react';
import cx from 'classnames';

// Instruments
import Styles from './styles.m.css';

// Components
import Checkbox from '../../theme/assets/Checkbox';
import Remove from '../../theme/assets/Remove';
import Edit from '../../theme/assets/Edit';
import Star from '../../theme/assets/Star';

export default class Task extends PureComponent {
    componentDidUpdate () {
        this.taskInput.current.focus();
    }

    taskInput = createRef();

    _getTaskShape = ({
        id = this.props.id,
        completed = this.props.completed,
        favorite = this.props.favorite,
        message = this.props.message,
    }) => ({
        id,
        completed,
        favorite,
        message,
    });

    _updateEditTaskMessage = ({ target: { value }}) => {
        const { actions: { updateEditTaskMessage }} = this.props;

        updateEditTaskMessage(value);
    }

    _updateTask = () => {
        const {
            message,
            editTaskMessage,
            actions: {
                updateTaskAsync,
                resetEditTaskId,
            },
        } = this.props;

        if (message === editTaskMessage) {
            resetEditTaskId();

            return null;
        }

        updateTaskAsync(this._getTaskShape({ message: editTaskMessage }));
    };

    _updateTaskMessageOnClick = () => {
        const {
            id,
            message,
            editTaskId,
            actions: {
                setEditTaskId,
                updateEditTaskMessage,
            },
        } = this.props;

        if (id === editTaskId) {
            this._updateTask();

            return null;
        }

        updateEditTaskMessage(message);
        setEditTaskId(id);
    }

    _updateTaskMessageOnKeyDown = ({ key }) => {
        const { editTaskMessage, actions: { resetEditTaskId }} = this.props;

        if (!editTaskMessage.length) {
            return null;
        }

        switch (key) {
            case 'Enter':
                this._updateTask();
                break;

            case 'Escape':
                resetEditTaskId();
                break;

            default:
                break;
        }
    }

    _toggleTaskCompletedState = () => {
        const { completed, actions: { updateTaskAsync }} = this.props;

        const taskToUpdate = this._getTaskShape({ completed: !completed });

        updateTaskAsync(taskToUpdate);
    }

    _toggleTaskFavoriteState = () => {
        const { favorite, actions: { updateTaskAsync }} = this.props;

        const taskToUpdate = this._getTaskShape({ favorite: !favorite });

        updateTaskAsync(taskToUpdate);
    }

    _removeTask = () => {
        const { id, actions: { removeTaskAsync }} = this.props;

        removeTaskAsync(id);
    }

    render () {
        const {
            id,
            message,
            favorite,
            completed,
            editTaskId,
            editTaskMessage,
        } = this.props;

        const isTaskEditing = id === editTaskId;
        const currentMessage = isTaskEditing ? editTaskMessage : message;

        const styles = cx(Styles.task, {
            [Styles.completed]: completed,
        });

        return (
            <li className = { styles }>
                <div className = { Styles.content }>
                    <Checkbox
                        inlineBlock
                        checked = { completed }
                        className = { Styles.toggleTaskCompletedState }
                        color1 = '#3B8EF3'
                        color2 = '#FFF'
                        onClick = { this._toggleTaskCompletedState }
                    />
                    <input
                        disabled = { !isTaskEditing }
                        maxLength = { 50 }
                        ref = { this.taskInput }
                        type = 'text'
                        value = { currentMessage }
                        onChange = { this._updateEditTaskMessage }
                        onKeyDown = { this._updateTaskMessageOnKeyDown }
                    />
                </div>
                <div className = { Styles.actions }>
                    <Star
                        inlineBlock
                        checked = { favorite }
                        className = { Styles.toggleTaskFavoriteState }
                        color1 = '#3B8EF3'
                        color2 = '#000'
                        onClick = { this._toggleTaskFavoriteState }
                    />
                    <Edit
                        inlineBlock
                        checked = { isTaskEditing }
                        className = { Styles.updateTaskMessageOnClick }
                        color1 = '#3B8EF3'
                        color2 = '#000'
                        onClick = { this._updateTaskMessageOnClick }
                    />
                    <Remove
                        inlineBlock
                        className = { Styles.removeTask }
                        color1 = '#3B8EF3'
                        color2 = '#000'
                        onClick = { this._removeTask }
                    />
                </div>
            </li>
        );
    }
}
