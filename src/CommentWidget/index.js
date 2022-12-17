import "./index.scss"
import Navigation from "./Navigation"
import BannerItems from "./banner"
import image from '../Assets/profile.jpg'
import { v4 as uuid } from 'uuid'
import { useState } from "react"

export default function CommentWidget() {

    const [commentSession, setCommentSession] = useState([])
    const [isreply, setIsReply] = useState(false)
    const [ischeck, setIsCheck] = useState(false)
    const [isNestedReply, setNestedReply] = useState(false)
    const [isEdit, setIsEdit] = useState(true)
    const [editCommentIndex, setEditCommentIndex] = useState(0)
    const [userId, setUserId] = useState('');
    const [commentIndex, setCommentIndex] = useState(0)
    const [replyCommentUserId, setReplyCommentUserId] = useState('')
    const [nestedReplyIndex, setNestedReplyIndex] = useState(0)
    const [nestedDeleteIndex, setNestedDeleteIndex] = useState(0)
    const [index, setIndex] = useState(0)
    const [comment, setComment] = useState(
        {
            userComment: '',
            userId: '',
            reply: []
        }
    )

    const [reply, setReply] = useState(
        {
            replyComment: '',
            replyUserId: '',
        }
    )

    const onChangeReplyHandler = (event) => {
        return (
            setReply({ ...reply, [event.target.name]: event.target.value })
        )
    }

    const handleUpdateReply = (event) => {
        event.preventDefault()

        if (!!reply.replyComment) {
            const replyId = uuid().slice(0, 4)
            reply.replyUserId = replyId;
            commentSession[commentIndex].reply = [...commentSession[commentIndex].reply, { reply }]
            setIsCheck(true)
            setIsReply(false)
        }
        setReply({ ...reply, replyComment: '' })
    }

    const handleUpdateComment = (event) => {
        event.preventDefault()

        if (!!comment.userComment) {
            const randomId = uuid().slice(0, 4);
            comment.userId = randomId;
            setCommentSession([...commentSession, comment])
        }
        setComment({ ...comment, userComment: '' })
    }

    const onChangeCommentHandler = (event) => {
        return (
            setComment({ ...comment, [event.target.name]: event.target.value })
        )
    }

    const updateReply = (userId, index) => {
        setUserId(userId)
        setIsReply(true)
        setCommentIndex(index)
    }

    const handleCancel = () => {
        setIsReply(false)
    }

    const updateNestedReply = (event, index) => {
        setReplyCommentUserId(event.reply.replyUserId)
        setNestedReply(true)
    }

    const handleNestedCancel = () => {
        setNestedReply(false)
    }

    const onChangeNestedReplyHandler = (event) => {
        return (
            setReply({ ...reply, [event.target.name]: event.target.value })
        )
    }

    const handleUpdateNestedReply = (event) => {
        const nestedUserIdId = uuid().slice(0, 4);
        reply.replyUserId = nestedUserIdId;
        event.preventDefault()
        if (reply.replyComment && reply.replyUserId) {
            commentSession[commentIndex].reply.push({ reply })
            console.log('hi');
            setNestedReply(false)
        }
        setReply({ ...reply, replyComment: '', replyUserId: '' })
    }

    const HandleEditReply = (commentValue, userComment, userId, index) => {

        comment.userComment = userComment
        comment.userId = userId
        comment.reply = commentValue.reply
        setEditCommentIndex(index)
        setIsEdit(false)
    }

    const handleEditComment = () => {
        commentSession[editCommentIndex] = comment
        setIsEdit(true)
        setComment({ ...comment, userComment: '' })
    }

    const HandleDeleteReply = (deleteIndex) => {
        const deletedComments = commentSession.filter((comments, index) => {
            return (index !== deleteIndex)
        })

        setCommentSession(deletedComments)
    }

    const HandleNestedEditReply = (comment, commentIndex, index) => {
        console.log(comment, commentIndex, index);
        setNestedReplyIndex(index)
    }

    const HandleNestedDeleteReply = (commentIndex, index) => {
        
        const nestedDeleteComment = commentSession[commentIndex].reply.filter((comments, deleteIndex) => {
            return (
                deleteIndex !== index
            )
        })
        console.log(nestedDeleteComment);
        setCommentSession(commentSession[commentIndex].reply = nestedDeleteComment)

    }

    return (
        <div className="container">
            <Navigation />
            <div className="banner">
                <BannerItems />
                <div className="comment-session">
                    <div className="comment-session-profile">
                        <img className="comment-session-image" src={image} alt='loading' />
                    </div>
                    <div className="comment-session-input-session">
                        <input className="comment-session-input"
                            type='text'
                            name="userComment"
                            placeholder="Add a comment"
                            onChange={onChangeCommentHandler}
                            value={comment.userComment}
                        />
                    </div>
                </div>
            </div>

            <div className="comment-session-button">
                {isEdit ? <button
                    onClick={handleUpdateComment}
                    className="comment-button">
                    Comment
                </button> :
                    <button
                        onClick={handleEditComment}
                        className="comment-button">
                        update
                    </button>
                }
            </div>

            <div className='comment-container'>
                {
                    commentSession.map((comment, commentindex) => {

                        return (
                            <div key={commentindex} className='comment-container-items'>
                                <div className="comment-container-header">
                                    <div className="comment-container-profile">
                                        <img
                                            className="comment-container-profile-image"
                                            src={image} alt='loading'
                                        />
                                    </div>
                                    <div className='comment-container-user'>
                                        <h2 className="comment-container-user-name">@{comment.userId}</h2>
                                        <p className='comment-container-comment'>{comment.userComment}</p>

                                        <div className="comment-container-replay-session">
                                            <p className='comment-container-replay'
                                                onClick={() => updateReply(comment.userId, commentindex, comment.reply)}>
                                                Reply
                                            </p>
                                            <p className='comment-container-replay'
                                                onClick={() => HandleEditReply(comment, comment.userComment, comment.userId, commentindex)}
                                            >
                                                Editt
                                            </p>
                                            <p className='comment-container-replay'
                                                onClick={() => HandleDeleteReply(commentindex)}
                                            >
                                                Delete
                                            </p>
                                        </div>
                                        {
                                            (isreply && comment.userId === userId) ?

                                                <div key={commentindex}>
                                                    <div className="replay-container">
                                                        <div className="comment-container-profile">
                                                            <img
                                                                className="comment-container-profile-image"
                                                                src={image} alt='loading'
                                                            />
                                                        </div>
                                                        <div className="comment-session-input-session">
                                                            <input className="comment-session-input"
                                                                type='text'
                                                                name="replyComment"
                                                                placeholder="Add a replay"
                                                                onChange={onChangeReplyHandler}
                                                                value={reply.replyComment}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="comment-session-button">
                                                        <button
                                                            onClick={handleUpdateReply}
                                                            className="comment-button">
                                                            reply
                                                        </button>
                                                        <button className="comment-button"
                                                            onClick={handleCancel}>
                                                            cancel
                                                        </button>
                                                    </div>
                                                </div>
                                                :
                                                ''
                                        }
                                        <div className="nested-replay-container">
                                            {
                                                ischeck &&
                                                comment.reply?.map((replyComment, index) => {
                                                    return (
                                                        <div
                                                            key={index}
                                                            className="nested-replay-container-items">
                                                            <h3
                                                                className="nested-replay-container-heading">
                                                                @{replyComment.reply.replyUserId} <br></br>
                                                                {replyComment.reply.replyComment}
                                                            </h3>
                                                            <div className="comment-container-replay-session">
                                                                <p className='comment-container-replay'
                                                                    onClick={() => updateNestedReply(replyComment, index)}>
                                                                    Reply
                                                                </p>
                                                                <p className='comment-container-replay'
                                                                    onClick={() => HandleNestedEditReply(comment, commentindex, index)}
                                                                >
                                                                    Editt
                                                                </p>
                                                                <p className='comment-container-replay'
                                                                    onClick={() => HandleNestedDeleteReply(commentindex, index)}
                                                                >
                                                                    Delete
                                                                </p>

                                                                {
                                                                    isNestedReply && replyCommentUserId === replyComment.reply.replyUserId ?
                                                                        <div key={index}>
                                                                            <div className="replay-container">
                                                                                <div className="comment-container-profile">
                                                                                    <img
                                                                                        className="comment-container-profile-image"
                                                                                        src={image} alt='loading'
                                                                                    />
                                                                                </div>
                                                                                <div className="comment-session-input-session">
                                                                                    <input className="comment-session-input"
                                                                                        type='text'
                                                                                        name="replyComment"
                                                                                        placeholder="Add a replay"
                                                                                        onChange={onChangeNestedReplyHandler}
                                                                                        value={reply.replyComment}
                                                                                    />
                                                                                </div>
                                                                            </div>
                                                                            <div className="comment-session-button">
                                                                                <button
                                                                                    onClick={handleUpdateNestedReply}
                                                                                    className="comment-button">
                                                                                    reply
                                                                                </button>
                                                                                <button className="comment-button"
                                                                                    onClick={handleNestedCancel}>
                                                                                    cancel
                                                                                </button>
                                                                            </div>
                                                                        </div>
                                                                        :
                                                                        ''
                                                                }
                                                            </div>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                    </div>

                                </div>
                            </div>
                        )
                    })
                }
            </div>

        </div>
    )
}