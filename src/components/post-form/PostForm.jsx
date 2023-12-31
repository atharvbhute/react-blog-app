import React, { useCallback, useEffect } from 'react'
import {Select, Input, RTE, Button} from '../index'
import { useForm } from 'react-hook-form'
import service from '../../appwrite/config';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function PostForm({post}) {

    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData)

    const {register, handleSubmit, watch, setValue, getValues} = useForm({
        defaultValues: {
            title : post?.title || '',
            content : post?.content || '',
            slug : post?.slug || '',
            featuredImage : post?.featured_image || '',
            status : post?.status || '',
        }
    }); 

    const submit = async (data) => {
        if (post) {
            // updata image
            const file = data.featuredImage[0] ? await service.uploadImage(featuredImage[0]) : null
            if (file) {
                service.deleteImage(post.featuredImage);
            }
            const updatatedPost = await service.updatePost(post.id, {...data, featuredImage: file.$id || undefined })
            if (updatatedPost) {
                navigate(`/posts/${updatatedPost.$id}`)                                
            }
        }
        else{
            const file = data.featuredImage[0] ? await service.uploadImage(featuredImage[0]) : null
            if (file) {
                const fileId = file.$id;
                data.featuredImage = fileId;
                const createdPost = await service.createPost({...data, userId : userData.$id})
                if (updatatedPost) {
                navigate(`/posts/${createdPost.$id}`)                                
                }
            }
        }
    }

    const slugTransform = useCallback((value) => {
        if (typeof value == "string" && value) {
            return value
            .trim()
            .toLowerCase()
            .replace(/[^a-zA-Z\d\s]+/g,"-")
            .replace(/\s/g, "-");
        }
        return "";       
    },[]);

    useEffect(()=>{
        const subscribe = watch((data, {name})=>{
            if (name == "title") {
                setValue('slug', slugTransform(data.title), { shouldValidate: true })
            }
        })

        return subscribe.unsubscribe();
    },[watch])


  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            <div className="w-2/3 px-2">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                />
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
            </div>
            <div className="w-1/3 px-2">
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("featuredImage", { required: !post })}
                />
                {post && (
                    <div className="w-full mb-4">
                        <img
                            src={appwriteService.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                />
                <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
  )
}

export default PostForm