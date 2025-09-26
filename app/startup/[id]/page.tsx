import { client } from "@/sanity/lib/client";
import { STARTUPS_BY_ID_QUERY, PLAYLIST_BY_SLUG_QUERY } from "@/sanity/lib/queries";
import { notFound } from "next/navigation";
import { formatDate } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import markdownit from 'markdown-it'
import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";
import View from "@/components/View";
import StartupCard, { StartupTypeCard } from "@/components/StartupCard";
// export const experimental_ppr = true;

const md = markdownit()

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
    const id = (await params).id;

    const [post,
        // { select: editorPosts = [] }
    ] = await Promise.all([
        client.fetch(STARTUPS_BY_ID_QUERY, { id }),
        // client.fetch(PLAYLIST_BY_SLUG_QUERY, { slug: 'editor-picks-new' })

    ])

    if (!post) return notFound();



    const parsedContent = md.render(post?.pitch || "")
    return (
        <div className="min-h-screen bg-[#09090b]">
            {/* Blog-style Layout */}
            <div className="blog-layout">
                {/* Left Column - Main Content */}
                <div className="blog-main-content">
                    {/* Header with Meta Info */}
                    <div className="blog-header">
                        <div className="blog-meta">
                            <span className="blog-date">{formatDate(post?._createdAt)}</span>
                            <span className="blog-category">{post.category}</span>
                        </div>
                        <h1 className="blog-title">{post.title}</h1>
                        <p className="blog-description">{post.description}</p>
                    </div>

                    {/* Featured Image - Smaller */}
                    <div className="blog-image-container">
                        <Image
                            src={post.image}
                            alt={post.title}
                            fill
                            className="blog-featured-image"
                            priority
                        />
                    </div>

                    {/* Author Info Under Image */}
                    {post.author && (
                        <div className="blog-author-info">
                            <Link href={`/user/${post.author._id}`} className="blog-author-link">
                                <div className="blog-author-avatar">
                                    <Image
                                        src={post.author.image || "https://placehold.co/48x48"}
                                        alt={post.author.name}
                                        width={48}
                                        height={48}
                                        className="blog-author-image"
                                    />
                                </div>
                                <div className="blog-author-details">
                                    <h3 className="blog-author-name">{post.author.name}</h3>
                                    <p className="blog-author-username">@{post.author.username}</p>
                                </div>
                            </Link>
                        </div>
                    )}

                    {/* Pitch Details */}
                    <div className="blog-content-section">
                        <h2 className="blog-content-title">Pitch Details</h2>
                        <div className="blog-content-body">
                            {parsedContent ? (
                                <article
                                    className="blog-content-article"
                                    dangerouslySetInnerHTML={{ __html: parsedContent }}
                                />
                            ) : (
                                <p className="blog-no-content">No pitch details provided</p>
                            )}
                        </div>
                    </div>

                    {/* View Counter - Left Side */}
                    <div className="blog-stats-left fixed top-1/2">
                        <Suspense fallback={<Skeleton className="blog-view-skeleton" />}>
                            <View id={id} />
                        </Suspense>
                    </div>
                </div>

                {/* Right Column - Sidebar */}
                <div className="blog-sidebar">
                    {/* Author Profile Card */}
                    {post.author && (
                        <div className="blog-author-card">
                            <div className="blog-author-card-header">
                                <Image
                                    src={post.author.image || "https://placehold.co/64x64"}
                                    alt={post.author.name}
                                    width={64}
                                    height={64}
                                    className="blog-author-card-avatar"
                                />
                                <h3 className="blog-author-card-name">{post.author.name}</h3>
                                <button className="blog-follow-btn">Follow</button>
                            </div>
                            <div className="blog-author-card-details">
                                <p className="blog-author-card-title">Software Engineer. Technical Writer</p>
                                <div className="blog-author-card-info">
                                    <span className="blog-author-card-label">LOCATION</span>
                                    <span className="blog-author-card-value">Owerri, Nigeria</span>
                                </div>
                                <div className="blog-author-card-info">
                                    <span className="blog-author-card-label">JOINED</span>
                                    <span className="blog-author-card-value">15 Feb 2024</span>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* More from Author Section */}
                    <div className="blog-more-section">
                        <h4 className="blog-more-title">More from {post.author?.name}</h4>
                        <div className="blog-more-list">
                            <div className="blog-more-item">
                                <h5 className="blog-more-item-title">Dev, Staging, and Production Environments in Software Development</h5>
                                <div className="blog-more-item-tags">
                                    <span className="blog-tag">#softwaredevelopment</span>
                                    <span className="blog-tag">#softwareengineering</span>
                                    <span className="blog-tag">#programming</span>
                                    <span className="blog-tag">#webdev</span>
                                </div>
                            </div>
                            <div className="blog-more-item">
                                <h5 className="blog-more-item-title">What's the Difference between NPM and NPX</h5>
                                <div className="blog-more-item-tags">
                                    <span className="blog-tag">#node</span>
                                    <span className="blog-tag">#javascript</span>
                                    <span className="blog-tag">#npm</span>
                                    <span className="blog-tag">#npx</span>
                                </div>
                            </div>
                            <div className="blog-more-item">
                                <h5 className="blog-more-item-title">What Does Simple Addition Look Like in 10 Programming Languages?</h5>
                                <div className="blog-more-item-tags">
                                    <span className="blog-tag">#webdev</span>
                                    <span className="blog-tag">#programming</span>
                                    <span className="blog-tag">#python</span>
                                    <span className="blog-tag">#javascript</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default page 