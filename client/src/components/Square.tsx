import React, {FC} from 'react';
import {Button} from 'react-bootstrap';

const Square: FC<{
    onClick: React.MouseEventHandler<HTMLButtonElement>,
    value: any
}> = ({onClick, value}) => {
    return (
        <div>
            <Button
                variant={"outline-dark"}
                className="square"
                onClick={onClick}>{value}</Button>
        </div>
    );
}

export default Square;
