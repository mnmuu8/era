import React, { useCallback, useEffect, useState } from 'react'
import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import AssignmentIcon from '@material-ui/icons/Assignment';
import AddCircleIcon from '@material-ui/icons/AddCircle'
import HistoryIcon from '@material-ui/icons/History'
import PersonIcon from '@material-ui/icons/Person'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import { useDispatch, useSelector } from 'react-redux'
import { push } from 'connected-react-router'
import { signOut } from '../../reducks/users/operations'
import { db } from '../../firebase'
import { Divider } from '@material-ui/core'
import { getUserRole } from '../../reducks/users/selectors'

const ClosableDrawer = (props) => {
  const { container } = props
  const dispatch = useDispatch();
  const selector = useSelector(state => state)
  const role = getUserRole(selector)

  const selectMenu = (e, path) => {
    dispatch(push(path))
    props.onClose(e)
  }

  const [filters, setFilters] = useState([
    {func: selectMenu, label: "すべて", id: "all", value: "/"},
  ])

  const menus = [
    {func: selectMenu, label: "商品一覧", icon: <AssignmentIcon />, id: "list", value: "/"},
    {func: selectMenu, label: "商品登録", icon: <AddCircleIcon />, id: "register", value: "/product/edit"},
    {func: selectMenu, label: "注文履歴", icon: <HistoryIcon />, id: "history", value: "/order/history"},
    {func: selectMenu, label: "プロフィール", icon: <PersonIcon />, id: "profile", value: "/user/mypage"},
    {func: selectMenu, label: "問い合わせ", icon: <MailOutlineIcon />, id: "contact", value: "/"},
  ]
  const userMenus = [
    {func: selectMenu, label: "商品一覧", icon: <AssignmentIcon />, id: "list", value: "/"},
    {func: selectMenu, label: "注文履歴", icon: <HistoryIcon />, id: "history", value: "/order/history"},
    {func: selectMenu, label: "プロフィール", icon: <PersonIcon />, id: "profile", value: "/user/mypage"},
    {func: selectMenu, label: "問い合わせ", icon: <MailOutlineIcon />, id: "contact", value: "/"},
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
    <Drawer
      container={container}
      variant="temporary"
      anchor='right'
      open={props.open}
      onClose={(e) => props.onClose(e)}
      ModalProps={{keepMounted: true}}
      className="c-closable-drawer"
    >
      <div onClose={(e) => props.onClose(e)} className="inner">
        <div className='drawer__title'>メニュー</div>
        <Divider />
        <List>
          {role === "admin" ? (
            menus.map(menu => (
              <ListItem button key={menu.id} onClick={(e) => menu.func(e, menu.value)}>
                <ListItemIcon>
                  {menu.icon}
                </ListItemIcon>
                <ListItemText primary={menu.label} />
              </ListItem>
            ))
          ) : (
            userMenus.map(menu => (
              <ListItem button key={menu.id} onClick={(e) => menu.func(e, menu.value)}>
                <ListItemIcon>
                  {menu.icon}
                </ListItemIcon>
                <ListItemText primary={menu.label} />
              </ListItem>
            ))
          )}
          
          <ListItem 
            button 
            key="logout" 
            onClick={(e) => {
              dispatch(signOut())
              props.onClose(e)
            }}
          >
            <ListItemIcon>
              <ExitToAppIcon />
            </ListItemIcon>
            <ListItemText primary={"サインアウト"} />
          </ListItem>
        </List>
        <div className='drawer__title'>カテゴリー</div>
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
  )
}

export default ClosableDrawer
