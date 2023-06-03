import React from 'react'
import { Button } from 'antd';

const Buttons = ({ onClick, text, type, shape, icon, size, loading, disabled, block }) => {
    return (
        <Button
            onClick={onClick}
            type={type}
            shape={shape}
            icon={icon}
            size={size}
            loading={loading}
            disabled={disabled}
            block={block}
        >
            {text}
        </Button>
    )
}

export default Buttons
