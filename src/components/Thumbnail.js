import React from 'react';

function Thumbnail(props) {
    const defaultImage = props.thumbnails.hasOwnProperty('standard') ?
        props.thumbnails.standard :
        props.thumbnails.default;

    function createSrcSet() {
        return Object.values(props.thumbnails)
            .reduce((accumulator, currValue, index, arr) => {
                accumulator += `${currValue.url} ${currValue.width}w`;
                if (index < arr.length - 1)
                    accumulator += ", ";
                return accumulator;
            }, "");

        //let temp = "";
        //Object.keys(props.thumbnails)
        //    .forEach((key, index, arr) => {
        //        temp += `${props.thumbnails[key].url} ${props.thumbnails[key].width}w`;
        //        if (index < arr.length - 1)
        //            temp += ", ";
        //    });
        //return temp;
    }

    return (
        <img
            className={props.className}
            alt={props.alt}
            width={defaultImage.width}
            height={defaultImage.height}
            src={defaultImage.url}
            srcSet={createSrcSet()}
            sizes="50vw"
        />
    );
}

export default Thumbnail;