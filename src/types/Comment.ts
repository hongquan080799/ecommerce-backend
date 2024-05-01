export type Comment = {
    id: number;
    user: string;
    userAvatar: string;
    message: string;
    time: Date;
}
export type CommentRequest = {
    userId: number;
    productId: number;
    message: string;
}