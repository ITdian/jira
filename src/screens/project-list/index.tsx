import { SearchPanel } from './search-panel'
import { List } from './list'
import { useState, useEffect } from 'react';
import { cleanObject, useMount, useDebounce } from 'utils'
import qs from 'qs'
import { env } from 'env'
const httpServer = env.REACT_APP_API_URL
console.log(env)
export const ProjectListScreen = () => {
  const [param, setParam] = useState({
    name: '',
    personId: ''
  })
  const debouceParam = useDebounce(param, 400)
  const [users, setUsers] = useState([])
  const [list, setList] = useState([])
  useEffect(() => {
    fetch(`${httpServer}/projects?${qs.stringify(cleanObject(debouceParam))}`).then(async response => {
      if (response.ok) {
        setList(await response.json())
      }
    })
  }, [debouceParam])
  useMount(() => {
    fetch(`${httpServer}/users`).then(async response => {
      if (response.ok) {
        setUsers(await response.json())
      }
    })
  })
  return <div>
      <SearchPanel users={users} param={param} setParam={setParam} />
      <List list={list} users={users} />
  </div>
}