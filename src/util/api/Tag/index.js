import { create } from './create'
import { getAll } from './getAll'
import { append } from './append'
import { remove } from './remove'
import { update } from './update'
import { deleteTag } from './deleteTag'

const Tag = {
  append,
  deleteTag,
  remove,
  getAll,
  update,
  create,
}

export { Tag }
