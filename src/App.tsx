
import React from 'react'
import { SqlEditor } from './components/SqlEditor'
import { SqlDataVisualiser } from './components/SqlDataVisualiser'
import { PageHeader } from './components/PageHeader'
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import { AppTheme, AppThemeContextProvider, useAppThemeContext } from './context/AppThemeContext'
import { SqlQueryExecutionContextProvider } from './context/SqlQueryExecutionContext'
import "./styles.scss";
import { ResizeHandle } from './components/PageResizeHandle';

export default function App() {
  const { theme } = useAppThemeContext()
  const [editorHeight, setEditorHeight] = React.useState<number | undefined>()
  const [dataWindowHeight, setDataWindowHeight] = React.useState<number | undefined>()

  return (
    <div className={`app-container ${theme === AppTheme.DARK && 'dark__theme'}`}>
      <PageHeader />
      <SqlQueryExecutionContextProvider>
        <main className='page-body'>
          <section className='panel-container'>
            <PanelGroup className='panel-group' autoSaveId="some-id" direction="vertical">
              <Panel className={'sql-editor-panel'} minSize={20} onResize={(size: number) => {
                setEditorHeight(size)
              }} order={1}>
                <SqlEditor editorHeight={editorHeight} />
              </Panel>
              <ResizeHandle />
              <Panel onResize={(size: number) => {
                setDataWindowHeight(size)
              }} className={'sql-data-visualizer-panel'} minSize={20} order={2}>
                <SqlDataVisualiser containerHeight={dataWindowHeight} />
              </Panel>
            </PanelGroup>
          </section>
        </main>
      </SqlQueryExecutionContextProvider>
    </div>
  );
}