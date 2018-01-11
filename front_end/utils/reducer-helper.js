/**
 * KnP: some common functions used among reducers
 */

export function addEntities(state, entities) {
  if (entities.length > 0) {
    for (const e of entities) {
      addEntity(state, e)
    }
  }
  return state
}

export function addEntity(state, newEntity) {
  if (state[newEntity.id] === undefined) state[newEntity.id] = newEntity
  return state
}

export function removeEntity(state, entityId) {
  if (state[entityId] !== undefined) delete state[entityId]
  return state
}

export function addEntityIds(state, entities) {
  if (entities.length > 0) {
    for (const e of entities) {
      addEntityId(state, e)
    }
  }
  return state
}

export function addEntityId(state, newEntity) {
  const { id } = newEntity
  if (!state.includes(id)) state.push(id)
  return state
}

export function removeEntityId(state, entityId) {
  const idx = state.indexOf(entityId)
  if (idx !== -1) state.splice(idx, 1)
  return state
}

const EntityHelper = {
  addEntities,
  addEntity,
  removeEntity,
  addEntityIds,
  addEntityId,
  removeEntityId
}

export default EntityHelper