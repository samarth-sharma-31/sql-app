import MonacoEditor from 'react-monaco-editor';
import Button from '@mui/material/Button';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import Tooltip from '@mui/material/Tooltip';
import SettingsSuggestOutlinedIcon from '@mui/icons-material/SettingsSuggestOutlined';
import { AppTheme, useAppThemeContext } from '../context/AppThemeContext';
import { useSqlQueryExecutionContext } from '../context/SqlQueryExecutionContext';
import { useEffect, useState } from 'react';

interface EditorProps {
    overrideOptions?: Record<string, any>
    editorHeight?: number
}

const DEFAULT_OPTIONS = {
    autoIndent: 'full',
    contextmenu: true,
    fontFamily: 'monospace',
    fontSize: 14,
    lineHeight: 24,
    hideCursorInOverviewRuler: true,
    renderLineHighlight: 'none',
    matchBrackets: 'always',
    minimap: {
        enabled: false,
    },
    selectOnLineNumbers: false,
    roundedSelection: false,
    readOnly: false,
    cursorStyle: 'line',
    automaticLayout: true,
} as const;



export function SqlEditor(props: EditorProps) {
    const { overrideOptions = {}, editorHeight = 20 } = props;
    const { theme } = useAppThemeContext()
    const { handleQueryUpdate, handleQueryExecute, handleQueryCopy, query } = useSqlQueryExecutionContext()
    const [copyQueryTooltipContent, setCopyQueryTooltipContent] = useState('')

    useEffect(() => {
        setCopyQueryTooltipContent(query ? 'Copy to clipboard' : '')
    }, [query])

    const onQueryCopy = () => {
        handleQueryCopy(() => {
            // on success
            setCopyQueryTooltipContent('Query copied!')
        })
    }

    const editorOptions = {
        ...DEFAULT_OPTIONS,
        ...overrideOptions
    }
    return (
        <div className='monaco-editor-container flex-col'>
            <div className='editor-header-container flex justify-between'>
                <div className='editor-header-label'>Editor</div>
                <div className='editor-header-action-btn flex items-center'>
                    <Tooltip key={copyQueryTooltipContent} arrow={true} title={copyQueryTooltipContent}>
                        <div onClick={onQueryCopy} className='copy-query-button'>
                            <ContentCopyIcon className={`copy-query-icon ${!query && 'copy-query-icon-disabled'}`} />
                        </div>
                    </Tooltip>
                    <Button disabled={!query} className='execute-query-btn' size='small' onClick={handleQueryExecute} startIcon={<SettingsSuggestOutlinedIcon />} variant="contained">Execute</Button>
                </div>
            </div>
            <MonacoEditor
                width="100%"
                height={`${editorHeight - 10}vh`}
                language="sql"
                theme={theme === AppTheme.LIGHT ? "vs-light" : "vs-dark"}
                value={query}
                options={editorOptions}
                onChange={handleQueryUpdate}
                className={"main-monaco-editor"}
            />
        </div >
    )
}