import LightModeIcon from '@mui/icons-material/LightMode';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import Tooltip from '@mui/material/Tooltip';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import { AppTheme, useAppThemeContext } from '../context/AppThemeContext';
import SqlIcon from '../images/sql-small.png'



export function PageHeader() {

    const { theme, toggleTheme } = useAppThemeContext()

    return (
        <header className='page-header-container'>
            <div className='page-header-label-container'>
                <img className='sql-icon' height={'24px'} width={'24px'} src={SqlIcon} />
                <div className='page-header-label'>Sql Playground</div>
            </div>
            <div className='page-header-actions'>
                <Tooltip arrow={true} title={theme === AppTheme.LIGHT ? 'Switch to dark mode' : 'Switch to light mode'}>
                    <div className="theme-toggle-container" onClick={toggleTheme}>
                        {
                            theme === AppTheme.LIGHT ? (<DarkModeOutlinedIcon className='theme-toggle-icon' />) : (<LightModeOutlinedIcon className='theme-toggle-icon' />)
                        }
                    </div>
                </Tooltip>
            </div>
        </header>
    )
}