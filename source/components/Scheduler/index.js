// Core
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import FlipMove from 'react-flip-move';

// Instruments
import { sortTasksByGroup } from '../../instruments/helpers';
import Styles from './styles.m.css';

// Components
import Task from '../Task';
import Checkbox from '../../theme/assets/Checkbox';
import Spinner from '../Spinner';

// Actions
import { tasksActions } from '../../bus/tasks/actions';

const mapStateToProps = (state) => ({
        isTasksFetching: state.ui.get('isTasksFetching'),
        tasks: sortTasksByGroup(state.tasks.get('tasks')),
        newTaskMessage: state.tasks.get('newTaskMessage'),
        editTaskId: state.tasks.get('editTaskId'),
        editTaskMessage: state.tasks.get('editTaskMessage'),
        tasksFilter: state.tasks.get('tasksFilter')
});

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({ ...tasksActions}, dispatch)
})

@connect(mapStateToProps, mapDispatchToProps)
export default class Scheduler extends Component {
    componentDidMount () {
        const { actions: { fetchTasksAsync }} = this.props;

        fetchTasksAsync();
    }

    _updateTasksFilter = ({ target: { value }}) => {
        const { actions: { updateTasksFilter }} = this.props;

        updateTasksFilter(value);
    }

    _updateNewTaskMessage = ({ target: { value }}) => {
        const { actions: { updateNewTaskMessage }} = this.props;

        updateNewTaskMessage(value);
    }

    _createTaskAsync = (event) => {
        event.preventDefault();
        const { actions: { createTaskAsync }, newTaskMessage} = this.props;

        if (!newTaskMessage) {
            return null;
        }
        
        createTaskAsync(newTaskMessage);
    }

    _getAllCompleted = () => {
        const { tasks } = this.props;

        return tasks.every((task) => task.get('completed'));
    }

    _completeAllTasksAsync = () => {
        const { tasks, actions: { completeAllTasksAsync }} = this.props;

        if (this._getAllCompleted()) {
            return null;
        }

        completeAllTasksAsync(tasks);
    }

    _animateTaskEnter = () => ({
        from: { transform: 'scale(0.5, 1)', opacity: 0 },
        to:   { transform: 'scale(1, 1)', opacity: 1 },
    })

    render () {
        const {
            actions,
            isTasksFetching,
            tasks,
            newTaskMessage,
            editTaskId,
            editTaskMessage,
            tasksFilter
        } = this.props;

        const allCompleted = this._getAllCompleted();

        const todoList = tasks
        .filter((task) => task.get('message').toLowerCase().includes(tasksFilter))
        .map((task) => (
            <Task
                completed = { task.get('completed') }
                favorite = { task.get('favorite') }
                id = { task.get('id') }
                key = { task.get('id') }
                message = { task.get('message') }
                actions = { actions }
                editTaskId = { editTaskId }
                editTaskMessage = { editTaskMessage }
            />
        ));

        return (
            <section className = { Styles.scheduler }>
                <Spinner isSpinning = { isTasksFetching } />
                <main>
                    <header>
                        <h1>Планировщик задач</h1>
                        <input
                            placeholder = 'Поиск'
                            type = 'search'
                            value = { tasksFilter }
                            onChange = { this._updateTasksFilter }
                        />
                    </header>
                    <section>
                        <form onSubmit = { this._createTaskAsync }>
                            <input
                                className = { Styles.createTask }
                                maxLength = { 50 }
                                placeholder = 'Описание моей новой задачи'
                                type = 'text'
                                value = { newTaskMessage }
                                onChange = { this._updateNewTaskMessage }
                            />
                            <button>Добавить задачу</button>
                        </form>
                        <div className = { Styles.overlay }>
                            <ul>
                                <FlipMove
                                    duration = { 400 }
                                    easing = 'ease-in-out'
                                    enterAnimation = { this._animateTaskEnter }
                                >
                                    {todoList}
                                </FlipMove>
                            </ul>
                        </div>
                    </section>
                    <footer>
                        <Checkbox
                            checked = { allCompleted }
                            color1 = '#363636'
                            color2 = '#fff'
                            onClick = { this._completeAllTasksAsync }
                        />
                        <span className = { Styles.completeAllTasks }>
                            Все задачи выполнены
                        </span>
                    </footer>
                </main>
            </section>
        );
    }
}
