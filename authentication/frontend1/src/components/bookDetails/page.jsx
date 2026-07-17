

export default function allBooks({keyNo ,bookInfo}){

return (
    <>
    <li id={keyNo}>
        <div>
            <div>{bookInfo.title}</div>
            <div>{bookInfo.author}</div>
            <div>{bookInfo.description}</div>
            <div>{bookInfo.price}</div>
            <div>{bookInfo.time}</div>
        </div>
    </li>
    </>
)

}