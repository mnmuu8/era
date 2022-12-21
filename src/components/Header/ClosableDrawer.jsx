import React, { useCallback, useState } from 'react'
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

  const menus = [
    {func: selectMenu, label: "商品登録", icon: <AddCircleIcon/>, id: "register", value: "/product/edit"},
    {func: selectMenu, label: "注文履歴", icon: <HistoryIcon />, id: "history", value: "/order/history"},
    {func: selectMenu, label: "プロフィール", icon: <PersonIcon />, id: "profile", value: "/user/mypage"},
  ]

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
        <div onClose={(e) => props.onClose(e)} onKeyDown={(e) => props.onClose(e)}>
          <div className='search__field'>
            <TextInput 
              fullWidth={false} label={"キーワードを入力"} multiline={false}
              onChange={inputKeyword} required={false} minRows={1} value={keyword} type={"text"}
            />
            <IconButton>
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
        </div>
      </Drawer>
    </nav>
  )
}

export default ClosableDrawer
