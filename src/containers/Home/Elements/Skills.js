import React from 'react';
import PropTypes from 'prop-types';

import Dnd from '../../../components/Dnd';
import Dnd2Column from '../../../components/Dnd2Column';
import Text from '../../../components/Text';
import Toast from '../../../lib/Toast';

import { appStore } from '../../../redux/store';
import { addSkill, updateSkill, deleteSkillData } from '../../../redux/core/actions';

import Util from '../../../lib/Util';
import styles from '../style.scss';

class Skills extends React.Component{
    
    constructor(props) {
        super(props);

        this.state = {
        }
    }

    componentDidMount() {
        appStore.dispatch(addSkill());
    }

    _updateSkill(data) {
        const storeReorder = Util.mapOrder(this.props.data, data, 'id');
        appStore.dispatch(updateSkill(storeReorder));
    }

    _addNewItem = () => {
        appStore.dispatch(addSkill());
    }

    _removeItem = (id, data) => {
        Toast.showUndo(id, data, 'skills', 'Skills Item Removed');
        appStore.dispatch(deleteSkillData(id));
    }

    render(){
        let { data } = this.props;
        return (
            <Dnd2Column
                data={data}
                reorder={(e) => this._updateSkill(e)}
                additem={this._addNewItem}
                removeitem={(e) => this._removeItem(e, data)}
                renderItem={(item) => (
                    <div style={{ background: '#fff' }}>
                        <Text
                            value={item.title}
                            statename="skills.title"
                            stateid={item.id}
                            placeholder="React Native"
                        />
                    </div>

                )}
            />

        )
     }
}


Skills.propTypes = {
    // value: PropTypes.string
};

Skills.defaultProps = {
};

/* Export Component =============================== */
export default Skills;