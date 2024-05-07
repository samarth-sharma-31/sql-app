import { PanelResizeHandle } from "react-resizable-panels";


interface ResizeHandleProps {
    className?: string
    id?: string
}

export function ResizeHandle({
    className = "",
    id,
}: ResizeHandleProps) {
    return (
        <PanelResizeHandle
            className={'panel-resize-handle'}
        >
            <div className='resize-icon-container'>
                <svg className='resize-svg' width={"14px"} height={'14px'} viewBox="0 0 24 24">
                    <path
                        fill="currentColor"
                        d="M8,18H11V15H2V13H22V15H13V18H16L12,22L8,18M12,2L8,6H11V9H2V11H22V9H13V6H16L12,2Z"
                    />
                </svg>
            </div>
        </PanelResizeHandle>
    );
}