import React, { useCallback, useEffect, useState } from 'react'
// import Divider from '@material-ui/core/Divider'
import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import IconButton from '@material-ui/core/IconButton'
import SearchIcon from '@material-ui/icons/Search'
import AddCircleIcon from '@material-ui/icons/AddCircle'
import HistoryIcon from '@material-ui/icons/History'
import PersonIcon from '@material-ui/icons/Person'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import TextInput from '../UIkit/TextInput'
import { useDispatch } from 'react-redux'
import { push } from 'connected-react-router'
import { signOut } from '../../reducks/users/operations'
import { db } from '../../firebase'
import { Divider } from '@material-ui/core'

const ClosableDrawer = (props) => {
  const { container } = props
  const dispatch = useDispatch();
  const [keyword, setKeyword] = useState("")

  const inputKeyword = useCallback((e) => {
    setKeyword(e.target.value)
  }, [setKeyword])

  const selectMenu = (e, path) => {
    dispatch(push(path))
    props.onClose(e)
  }

  const [filters, setFilters] = useState([
    {func: selectMenu, label: "すべて", id: "all", value: "/"},
  ])

  const menus = [
    {func: selectMenu, label: "商品登録", icon: <AddCircleIcon/>, id: "register", value: "/product/edit"},
    {func: selectMenu, label: "注文履歴", icon: <HistoryIcon />, id: "history", value: "/order/history"},
    {func: selectMenu, label: "プロフィール", icon: <PersonIcon />, id: "profile", value: "/user/mypage"},
  ]

  const searchKeyword = (e, path) => {
    dispatch(push(`?search=${path}`))
    props.onClose(e)
  }

  useEffect(() => {
    db.collection("categories")
      .orderBy('order', 'asc')
      .get()
      .then(snapshots => {
        const list = []
        snapshots.forEach(snapshot => {
          const category = snapshot.data()
          list.push({
            func: selectMenu, label: category.name, id: category.id, value: `/?category=${category.id}`
          })
        })
        setFilters(prevState => [...prevState, ...list])
      })
  }, [])

  return (
    <nav className='c-closable-drawer'>
      <Drawer
        container={container}
        variant="temporary"
        anchor='right'
        open={props.open}
        onClose={(e) => props.onClose(e)}
        ModalProps={{keepMounted: true}}
        className="inner"
      >
        <div onClose={(e) => props.onClose(e)} >
          <div className='search__field'>
            <TextInput 
              fullWidth={false} label={"キーワードを入力"} multiline={false}
              onChange={inputKeyword} required={false} minRows={1} value={keyword} type={"text"}
            />
            <IconButton onClick={(e) => searchKeyword(e, keyword)}>
              <SearchIcon />
            </IconButton>
          </div>
          <List>
            {menus.map(menu => (
              <ListItem button key={menu.id} onClick={(e) => menu.func(e, menu.value)}>
                <ListItemIcon>
                  {menu.icon}
                </ListItemIcon>
                <ListItemText primary={menu.label} />
              </ListItem>
            ))}
            <ListItem button key="logout" onClick={() => dispatch(signOut())}>
              <ListItemIcon>
                <ExitToAppIcon />
              </ListItemIcon>
              <ListItemText primary={"Logout"} />
            </ListItem>
          </List>
          <Divider />
          <List>
            {filters.map(filter => (
              <ListItem 
                button 
                key={filter.id}
                onClick={(e) => {
                  filter.func(e, filter.value)
                  props.onClose(e)
                }}
              >
                <ListItemText primary={filter.label} />
              </ListItem>
            ))}
          </List>
        </div>
      </Drawer>
    </nav>
  )
}

export default ClosableDrawer
