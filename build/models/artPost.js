"use strict";
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const artPostSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "Users",
    },
    description: {
        type: String,
    },
    title: {
        type: String,
        required: true,
    },
    time: {
        type: Date,
    },
    img: {
        type: String,
    },
    likes: [
        {
            user: {
                type: Schema.Types.ObjectId,
                ref: "Users",
            },
        },
    ],
    comments: [
        {
            user: {
                type: Schema.Types.ObjectId,
                ref: "Users",
            },
            text: {
                type: String,
                required: true,
            },
            name: {
                type: String,
            },
            time: {
                type: Date,
            },
        },
    ],
});
const artPost = mongoose.model("artPost", artPostSchema);
module.exports = artPost;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXJ0UG9zdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tb2RlbHMvYXJ0UG9zdC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsTUFBTSxRQUFRLEdBQUcsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0FBQ3JDLE1BQU0sTUFBTSxHQUFHLFFBQVEsQ0FBQyxNQUFNLENBQUM7QUFFL0IsTUFBTSxhQUFhLEdBQUcsSUFBSSxNQUFNLENBQUM7SUFDN0IsSUFBSSxFQUFFO1FBQ0YsSUFBSSxFQUFFLE1BQU0sQ0FBQyxLQUFLLENBQUMsUUFBUTtRQUMzQixHQUFHLEVBQUUsT0FBTztLQUNmO0lBQ0QsV0FBVyxFQUFFO1FBQ1QsSUFBSSxFQUFFLE1BQU07S0FDZjtJQUNELEtBQUssRUFBRTtRQUNILElBQUksRUFBRSxNQUFNO1FBQ1osUUFBUSxFQUFFLElBQUk7S0FDakI7SUFDRCxJQUFJLEVBQUM7UUFDRCxJQUFJLEVBQUUsSUFBSTtLQUNiO0lBQ0QsR0FBRyxFQUNIO1FBQ0ksSUFBSSxFQUFFLE1BQU07S0FDZjtJQUNELEtBQUssRUFBRTtRQUNIO1lBQ0UsSUFBSSxFQUFFO2dCQUNKLElBQUksRUFBRSxNQUFNLENBQUMsS0FBSyxDQUFDLFFBQVE7Z0JBQzNCLEdBQUcsRUFBRSxPQUFPO2FBQ2I7U0FDRjtLQUNGO0lBQ0QsUUFBUSxFQUFFO1FBQ1I7WUFDRSxJQUFJLEVBQUU7Z0JBQ0osSUFBSSxFQUFFLE1BQU0sQ0FBQyxLQUFLLENBQUMsUUFBUTtnQkFDM0IsR0FBRyxFQUFFLE9BQU87YUFDYjtZQUNELElBQUksRUFBRTtnQkFDSixJQUFJLEVBQUUsTUFBTTtnQkFDWixRQUFRLEVBQUUsSUFBSTthQUNmO1lBQ0QsSUFBSSxFQUFFO2dCQUNKLElBQUksRUFBRSxNQUFNO2FBQ2I7WUFDRCxJQUFJLEVBQUM7Z0JBQ0gsSUFBSSxFQUFFLElBQUk7YUFDWDtTQUNGO0tBQ0Y7Q0FDTixDQUFDLENBQUM7QUFFSCxNQUFNLE9BQU8sR0FBRyxRQUFRLENBQUMsS0FBSyxDQUFDLFNBQVMsRUFBRSxhQUFhLENBQUMsQ0FBQztBQUN6RCxNQUFNLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IG1vbmdvb3NlID0gcmVxdWlyZShcIm1vbmdvb3NlXCIpO1xyXG5jb25zdCBTY2hlbWEgPSBtb25nb29zZS5TY2hlbWE7XHJcblxyXG5jb25zdCBhcnRQb3N0U2NoZW1hID0gbmV3IFNjaGVtYSh7XHJcbiAgICB1c2VyOiB7XHJcbiAgICAgICAgdHlwZTogU2NoZW1hLlR5cGVzLk9iamVjdElkLFxyXG4gICAgICAgIHJlZjogXCJVc2Vyc1wiLFxyXG4gICAgfSxcclxuICAgIGRlc2NyaXB0aW9uOiB7XHJcbiAgICAgICAgdHlwZTogU3RyaW5nLFxyXG4gICAgfSxcclxuICAgIHRpdGxlOiB7XHJcbiAgICAgICAgdHlwZTogU3RyaW5nLFxyXG4gICAgICAgIHJlcXVpcmVkOiB0cnVlLFxyXG4gICAgfSxcclxuICAgIHRpbWU6e1xyXG4gICAgICAgIHR5cGU6IERhdGUsXHJcbiAgICB9LFxyXG4gICAgaW1nOiBcclxuICAgIHsgXHJcbiAgICAgICAgdHlwZTogU3RyaW5nLFxyXG4gICAgfSxcclxuICAgIGxpa2VzOiBbXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgdXNlcjoge1xyXG4gICAgICAgICAgICB0eXBlOiBTY2hlbWEuVHlwZXMuT2JqZWN0SWQsXHJcbiAgICAgICAgICAgIHJlZjogXCJVc2Vyc1wiLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICB9LFxyXG4gICAgICBdLFxyXG4gICAgICBjb21tZW50czogW1xyXG4gICAgICAgIHtcclxuICAgICAgICAgIHVzZXI6IHtcclxuICAgICAgICAgICAgdHlwZTogU2NoZW1hLlR5cGVzLk9iamVjdElkLFxyXG4gICAgICAgICAgICByZWY6IFwiVXNlcnNcIixcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICB0ZXh0OiB7XHJcbiAgICAgICAgICAgIHR5cGU6IFN0cmluZyxcclxuICAgICAgICAgICAgcmVxdWlyZWQ6IHRydWUsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgbmFtZToge1xyXG4gICAgICAgICAgICB0eXBlOiBTdHJpbmcsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgdGltZTp7XHJcbiAgICAgICAgICAgIHR5cGU6IERhdGUsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgIH0sXHJcbiAgICAgIF0sXHJcbn0pO1xyXG5cclxuY29uc3QgYXJ0UG9zdCA9IG1vbmdvb3NlLm1vZGVsKFwiYXJ0UG9zdFwiLCBhcnRQb3N0U2NoZW1hKTtcclxubW9kdWxlLmV4cG9ydHMgPSBhcnRQb3N0OyJdfQ==