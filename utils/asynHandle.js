const asyncHandler = (requestHandler) => {
    return (req, res, next) => {
        Promise.resolve(requestHandler(req, res, next)).catch((err) => {
            console.log(err);
            res.status(500).json({ message: "Internal Server Error" });
        });
    };
};

export { asyncHandler };
