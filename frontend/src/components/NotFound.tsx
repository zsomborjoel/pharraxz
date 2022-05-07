import React, { FC } from 'react'

export type NotFoundProps = {}

const NotFound: FC<NotFoundProps> = () => {
    return (
        <div>
            <h1>404 Not found</h1>
        </div>
    )
}

export default NotFound;