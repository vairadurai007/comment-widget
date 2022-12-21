import "./index.scss"
import Navigation from "./Navigation"
import BannerItems from "./banner"
import image from '../Assets/profile.jpg'
import { v4 as uuid } from 'uuid'
import { useState } from "react"

export default function CommentWidget() {

    const [commentSession, setCommentSession] = useState([])
    const [isreply, setIsReply] = useState(false)
    const [isNestedReply, setIsNestedReply] = useState(false)
    const [isEdit, setIsEdit] = useState(true)
    const [editCommentIndex, setEditCommentIndex] = useState(0)
    const [userId, setUserId] = useState('');
    const [commentIndex, setCommentIndex] = useState(0)
    const [replyCommentUserId, setReplyCommentUserId] = useState('')
    const [nestedReplyIndex, setNestedReplyIndex] = useState(0)
    const [NestedEditCommentIndex, setNestedEditCommentIndex] = useState(0)
    const [isNestedEdit, setIsNestedEdit] = useState(true)
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

    const onChangeCommentHandler = (event) => {
        return (
            setComment({ ...comment, [event.target.name]: event.target.value })
        )
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

    const updateEditComment = () => {
        commentSession[editCommentIndex] = comment
        setIsEdit(true)
        setComment({ ...comment, userComment: '' })
    }

    const handleCancelComment = () => {
        setIsEdit(true)
        setComment({ ...comment, userComment: '', userId: '' })
    }

    const handleReplyComment = (userId, commentIndex) => {
        setUserId(userId)
        setIsReply(true)
        setCommentIndex(commentIndex)
    }

    const handleEditReply = (commentValue, userComment, userId, index) => {

        comment.userComment = userComment
        comment.userId = userId
        comment.reply = commentValue.reply
        setEditCommentIndex(index)
        setIsEdit(false)
    }

    const onChangeReplyHandler = (event) => {
        return (
            setReply({ ...reply, [event.target.name]: event.target.value })
        )
    }

    const handleUpdateReplyComment = (event) => {
        event.preventDefault()

        if (!!reply.replyComment) {
            const replyId = uuid().slice(0, 4)
            reply.replyUserId = replyId;
            commentSession[commentIndex].reply = [...commentSession[commentIndex].reply, reply]
            setIsReply(false)
        }
        setReply({ ...reply, replyComment: '' })
    }

    const handleCancelReplyComment = () => {
        setIsReply(false)
    }

    const handleNestedReplyComment = (replyComment) => {
        setReplyCommentUserId(replyComment.replyUserId)
        setIsNestedReply(true)
    }

    const handleCancelNestedReplyComment = () => {
        setReply({ ...reply, replyComment: '' })
        setIsNestedReply(false)
        setIsNestedEdit(true)
    }

    const handleDeleteReply = (deleteIndex) => {
        const deletedComments = commentSession.filter((_, index) => {
            return (index !== deleteIndex)
        })
        setCommentSession([...deletedComments])
    }

    const handleUpdateNestedReplyComment = (commentIndex) => {

        const nestedUserIdId = uuid().slice(0, 4);
        reply.replyUserId = nestedUserIdId;

        if (reply.replyComment) {
            commentSession[commentIndex].reply.push(reply)
            setIsNestedReply(false)
        }
        setReply({ ...reply, replyComment: '', replyUserId: '' })
    }

    const handleEditNestedReply = (replyComment, replyUserId, commentIndex, replyIndex) => {

        reply.replyComment = replyComment
        reply.replyUserId = replyUserId
        setIsNestedReply(true)
        setNestedReplyIndex(replyIndex)
        setReplyCommentUserId(replyUserId)
        setIsNestedEdit(false)
        setNestedEditCommentIndex(commentIndex)
    }

    const onChangeNestedReplyHandler = (event) => {
        return (
            setReply({ ...reply, [event.target.name]: event.target.value })
        )
    }

    const handleDeleteNestedReply = (commentIndex, replyIndex) => {
        commentSession[commentIndex].reply.splice(replyIndex, 1)
        setCommentSession([...commentSession])
    }

    const updateEditNestedReplyComment = () => {
        commentSession[NestedEditCommentIndex].reply[nestedReplyIndex] = reply
        setIsNestedEdit(true)
        setIsNestedReply(false)
        setReply({ ...reply, replyComment: '' })
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
                {
                    isEdit ?
                        <button
                            onClick={handleUpdateComment}
                            className="comment-button">
                            Comment
                        </button> :
                        <button
                            onClick={updateEditComment}
                            className="comment-button">
                            update
                        </button>
                }
                <button className="comment-button"
                    onClick={handleCancelComment}>
                    cancel
                </button>
            </div>

            <div className='comment-container'>
                {
                    commentSession.map((comment, commentIndex) => {
                        return (
                            <div key={commentIndex} className='comment-container-items'>
                                <div className="comment-container-header">
                                    <div className="comment-container-profile">
                                        <img
                                            className="comment-container-profile-image"
                                            src={image} alt='loading'
                                        />
                                    </div>
                                    <div className='comment-container-user'>
                                        <h2 className="comment-container-user-name">
                                            @{comment.userId}
                                        </h2>
                                        <p className='comment-container-comment'>
                                            {comment.userComment}
                                        </p>
                                        <div className="comment-container-replay-session">
                                            <div className="comment-container-service">
                                                <p className='comment-container-replay'
                                                    onClick={() => handleReplyComment(comment.userId, commentIndex)}>
                                                    Reply
                                                </p>
                                                <p className='comment-container-replay'
                                                    onClick={() => handleEditReply(comment, comment.userComment, comment.userId, commentIndex)}
                                                >
                                                    Edit
                                                </p>
                                                <p className='comment-container-replay'
                                                    onClick={() => handleDeleteReply(commentIndex)}
                                                >
                                                    Delete
                                                </p>
                                            </div>
                                        </div>

                                        {
                                            (isreply && comment.userId === userId) ?
                                                <div key={commentIndex}>
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
                                                            onClick={handleUpdateReplyComment}
                                                            className="comment-button">
                                                            reply
                                                        </button>
                                                        <button className="comment-button"
                                                            onClick={handleCancelReplyComment}>
                                                            cancel
                                                        </button>
                                                    </div>
                                                </div>
                                                :
                                                ''
                                        }

                                        <div className="nested-replay-container">
                                            {
                                                comment.reply?.map((replyComment, index) => {
                                                    return (
                                                        <div
                                                            key={index}
                                                            className="nested-replay-container-items">

                                                            <h3
                                                                className="nested-replay-container-heading">
                                                                @{replyComment.replyUserId}
                                                            </h3>
                                                            <h3 className='comment-container-comment'>
                                                                {replyComment.replyComment}</h3>
                                                            <div className="comment-container-replay-session">
                                                                <div className="comment-container-service">
                                                                    <p className='comment-container-replay'
                                                                        onClick={() => handleNestedReplyComment(replyComment)}>
                                                                        Reply
                                                                    </p>
                                                                    <p className='comment-container-replay'
                                                                        onClick={() => handleEditNestedReply(replyComment.replyComment, replyComment.replyUserId, commentIndex, index)}
                                                                    >
                                                                        Edit
                                                                    </p>
                                                                    <p className='comment-container-replay'
                                                                        onClick={() => handleDeleteNestedReply(commentIndex, index)}
                                                                    >
                                                                        Delete
                                                                    </p>
                                                                </div>

                                                                {
                                                                    isNestedReply && replyCommentUserId === replyComment.replyUserId ?
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
                                                                                        placeholder="Add a reply"
                                                                                        onChange={onChangeNestedReplyHandler}
                                                                                        value={reply.replyComment}
                                                                                    />
                                                                                </div>
                                                                            </div>
                                                                            <div className="comment-session-button">
                                                                                {
                                                                                    isNestedEdit ?
                                                                                        <button
                                                                                            onClick={() => handleUpdateNestedReplyComment(commentIndex)}
                                                                                            className="comment-button">
                                                                                            reply
                                                                                        </button>
                                                                                        :
                                                                                        <button
                                                                                            onClick={updateEditNestedReplyComment}
                                                                                            className="comment-button">
                                                                                            update
                                                                                        </button>
                                                                                }
                                                                                <button className="comment-button"
                                                                                    onClick={handleCancelNestedReplyComment}>
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