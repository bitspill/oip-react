import React, { useRef } from 'react'
import withStyles from 'react-jss'
import uid from 'uid'

import { useGlobalFormState } from '../../../hooks'
import { protobuilder } from './dependencies'
import TagsInput from '../../UI/TagsInput'
import classNames from 'classnames'

const protoFields = {
  'string': 'text',
  'bool': 'text',
  'bytes': 'test',
  'double': 'number',
  'float': 'number',
  'enum': 'misc',
  'int32': 'number',
  'int64': 'number',
  'uint32': 'number',
  'uint64': 'number',
  'sint32': 'number',
  'sint64': 'number',
  'fixed32': 'number',
  'fixed64': 'number',
  'sfixed32': 'number',
  'sfixed64': 'number'
}

const SelectOptions = React.memo((
  { classes, state, opts, onChange, onFocus, onBlur, id, name = '' }
) => {
  if (!Array.isArray(opts)) {
    opts = Object.keys(opts)
  }

  return <select
    onChange={onChange ? (e) => onChange(e, id) : null}
    onFocus={onFocus ? (e) => { onFocus(e, id) } : null}
    onBlur={onBlur ? (e) => { onBlur(e, id) } : null}
    name={name}
    value={state[name]}
    className={classNames(classes.selectBase, classes.descriptorSelect)}
  >
    {opts.map((opt, i) => {
      return <option
        key={i}
        value={opt}
      >
        {opt}
      </option>
    })}
  </select>
}, (oldProps, newProps) => {
  return newProps.shouldUpdate ? newProps.shouldUpdate(oldProps, newProps) : false
})

const InputField = React.memo((
  { classes, state, onChange, onFocus, onBlur, id, type = 'text', name = '', placeholder = '', allowSpaces = true }
) => {
  let okd = () => {}
  if (!allowSpaces) {
    const onChangeCopy = onChange
    okd = (e) => {
      onChange = e.which === 32 ? () => {} : onChangeCopy
    }
  }
  return <input
    type={type}
    id={id}
    name={name}
    value={state[name]}
    onKeyDown={okd}
    onChange={onChange ? (e) => onChange(e, id) : null}
    onFocus={onFocus ? (e) => { onFocus(e, id) } : null}
    onBlur={onBlur ? (e) => { onBlur(e, id) } : null}
    placeholder={placeholder}
    className={classNames(classes.inputBase, classes.descriptorInputField)}
  />
}, (oldProps, newProps) => {
  return newProps.shouldUpdate ? newProps.shouldUpdate(oldProps, newProps) : false
})

const shouldUpdate = (oldProps, newProps) => {
  const nameDidNotChange = oldProps.state[oldProps.name] === newProps.state[newProps.name]
  const classesDidNotChange = oldProps.classes === newProps.classes
  return nameDidNotChange && classesDidNotChange
}


const FieldRow = ({ gfs, id, liftDescriptor, classes }) => {
  const isEnum = gfs.state.form[id].fieldType === 'enum'
 
  return <div>
    <SelectOptions
      opts={['singular', 'repeated']}
      id={id}
      state={gfs.state.form[id]}
      onChange={gfs.update}
      name={'fieldRule'}
      shouldUpdate={shouldUpdate}
      onBlur={liftDescriptor}
      classes={classes}
    />
    <SelectOptions
      opts={protoFields}
      id={id}
      state={gfs.state.form[id]}
      onChange={gfs.update}
      name={'fieldType'}
      shouldUpdate={shouldUpdate}
      onBlur={liftDescriptor}
      classes={classes}
    />
    <InputField
      placeholder={'Field Name'}
      id={id}
      state={gfs.state.form[id]}
      onChange={gfs.update}
      name={'fieldName'}
      shouldUpdate={shouldUpdate}
      allowSpaces={false}
      onBlur={liftDescriptor}
      classes={classes}
    />
    {isEnum ? <TagsInput
      placeholder={'(i.e. type enum fields here)'}
      onBlur={liftDescriptor}
      classes={classes}
      getTags={(tags) => {
        const e = {
          target: {
            name: 'enumValue',
            value: tags
          }
        }
        gfs.update(e, id)
      }}
    /> : null}
    {gfs.state.form[id].index > 0 && <button
      onClick={() => { gfs.remove(id) }}
      className={classNames(classes.buttonBase, classes.removeRowButton)}
    >-</button>}
  </div>
}

const DescriptorSetProto = ({ classes, getDescriptor }) => {
  const id = useRef(uid()).current

  const initialFormRow = {
    fieldType: 'string',
    fieldName: '',
    fieldRule: 'singular'
  }
  const gfs = useGlobalFormState(id, initialFormRow)

  const liftDescriptor = () => {
    if (getDescriptor) {
      let descriptor
      try {
        descriptor = protobuilder(gfs.state.form)
      } catch (err) {
        // dismiss error
      }
      if (descriptor) {
        getDescriptor(descriptor)
      }
    }
  }

  return <div className={classes.descriptorRoot}>
    <FieldRow
      gfs={gfs}
      id={id}
      liftDescriptor={liftDescriptor}
      classes={classes}
    />
    {Object.keys(gfs.state.form).map((formId) => {
      if (formId !== id) {
        return <FieldRow
          classes={classes}
          gfs={gfs}
          id={formId}
          key={formId}
          liftDescriptor={liftDescriptor}
        />
      }
    })}
    <button
      className={classNames(classes.buttonBase, classes.addRowButton)}
      onClick={() => gfs.add(uid(), initialFormRow)}>+</button>
  </div>
}

const styles = theme => ({
  descriptorRoot: {},
  buttonBase: {},
  addRowButton: {},
  removeRowButton: {},
  inputBase: {},
  descriptorInputField: {},
  selectBase: {},
  descriptorSelect: {},
})

export default withStyles(styles)(DescriptorSetProto)
