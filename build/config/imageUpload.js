"use strict";
const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
aws.config.update({
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    region: process.env.AWS_S3_REG
});
const s3 = new aws.S3();
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    }
    else {
        cb(new Error('Invalid file type, only JPEG and PNG is allowed!'), false);
    }
};
const upload = multer({
    fileFilter,
    storage: multerS3({
        acl: 'public-read',
        s3,
        bucket: 'my-realms-backend',
        metadata: function (req, file, cb) {
            cb(null, { fieldName: 'TESTING_METADATA' });
        },
        key: function (req, file, cb) {
            cb(null, Date.now().toString() + file.originalname);
        }
    })
});
module.exports = upload;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW1hZ2VVcGxvYWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29uZmlnL2ltYWdlVXBsb2FkLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxNQUFNLEdBQUcsR0FBRyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUM7QUFDL0IsTUFBTSxNQUFNLEdBQUcsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBQ2pDLE1BQU0sUUFBUSxHQUFHLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQztBQUV0QyxHQUFHLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQztJQUNoQixlQUFlLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxxQkFBcUI7SUFDbEQsV0FBVyxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsaUJBQWlCO0lBQzFDLE1BQU0sRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLFVBQVU7Q0FDL0IsQ0FBQyxDQUFDO0FBRUgsTUFBTSxFQUFFLEdBQUcsSUFBSSxHQUFHLENBQUMsRUFBRSxFQUFFLENBQUM7QUFFeEIsTUFBTSxVQUFVLEdBQUcsQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRSxFQUFFO0lBQ25DLElBQUksSUFBSSxDQUFDLFFBQVEsS0FBSyxZQUFZLElBQUksSUFBSSxDQUFDLFFBQVEsS0FBSyxXQUFXLEVBQUU7UUFDbkUsRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztLQUNoQjtTQUFNO1FBQ0wsRUFBRSxDQUFDLElBQUksS0FBSyxDQUFDLGtEQUFrRCxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUM7S0FDMUU7QUFDSCxDQUFDLENBQUE7QUFFRCxNQUFNLE1BQU0sR0FBRyxNQUFNLENBQUM7SUFDcEIsVUFBVTtJQUNWLE9BQU8sRUFBRSxRQUFRLENBQUM7UUFDaEIsR0FBRyxFQUFFLGFBQWE7UUFDbEIsRUFBRTtRQUNGLE1BQU0sRUFBRSxtQkFBbUI7UUFFM0IsUUFBUSxFQUFFLFVBQVUsR0FBRyxFQUFFLElBQUksRUFBRSxFQUFFO1lBQy9CLEVBQUUsQ0FBQyxJQUFJLEVBQUUsRUFBQyxTQUFTLEVBQUUsa0JBQWtCLEVBQUMsQ0FBQyxDQUFDO1FBQzVDLENBQUM7UUFFRCxHQUFHLEVBQUUsVUFBVSxHQUFHLEVBQUUsSUFBSSxFQUFFLEVBQUU7WUFDMUIsRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsUUFBUSxFQUFFLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFBO1FBQ3JELENBQUM7S0FDRixDQUFDO0NBQ0gsQ0FBQyxDQUFDO0FBRUgsTUFBTSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBhd3MgPSByZXF1aXJlKCdhd3Mtc2RrJyk7XHJcbmNvbnN0IG11bHRlciA9IHJlcXVpcmUoJ211bHRlcicpO1xyXG5jb25zdCBtdWx0ZXJTMyA9IHJlcXVpcmUoJ211bHRlci1zMycpO1xyXG5cclxuYXdzLmNvbmZpZy51cGRhdGUoe1xyXG4gIHNlY3JldEFjY2Vzc0tleTogcHJvY2Vzcy5lbnYuQVdTX1NFQ1JFVF9BQ0NFU1NfS0VZLFxyXG4gIGFjY2Vzc0tleUlkOiBwcm9jZXNzLmVudi5BV1NfQUNDRVNTX0tFWV9JRCxcclxuICByZWdpb246IHByb2Nlc3MuZW52LkFXU19TM19SRUdcclxufSk7XHJcblxyXG5jb25zdCBzMyA9IG5ldyBhd3MuUzMoKTtcclxuLy9AdHMtaWdub3JlXHJcbmNvbnN0IGZpbGVGaWx0ZXIgPSAocmVxLCBmaWxlLCBjYikgPT4ge1xyXG4gIGlmIChmaWxlLm1pbWV0eXBlID09PSAnaW1hZ2UvanBlZycgfHwgZmlsZS5taW1ldHlwZSA9PT0gJ2ltYWdlL3BuZycpIHtcclxuICAgIGNiKG51bGwsIHRydWUpO1xyXG4gIH0gZWxzZSB7XHJcbiAgICBjYihuZXcgRXJyb3IoJ0ludmFsaWQgZmlsZSB0eXBlLCBvbmx5IEpQRUcgYW5kIFBORyBpcyBhbGxvd2VkIScpLCBmYWxzZSk7XHJcbiAgfVxyXG59XHJcblxyXG5jb25zdCB1cGxvYWQgPSBtdWx0ZXIoe1xyXG4gIGZpbGVGaWx0ZXIsXHJcbiAgc3RvcmFnZTogbXVsdGVyUzMoe1xyXG4gICAgYWNsOiAncHVibGljLXJlYWQnLFxyXG4gICAgczMsXHJcbiAgICBidWNrZXQ6ICdteS1yZWFsbXMtYmFja2VuZCcsXHJcbiAgICAvL0B0cy1pZ25vcmVcclxuICAgIG1ldGFkYXRhOiBmdW5jdGlvbiAocmVxLCBmaWxlLCBjYikge1xyXG4gICAgICBjYihudWxsLCB7ZmllbGROYW1lOiAnVEVTVElOR19NRVRBREFUQSd9KTtcclxuICAgIH0sXHJcbiAgICAvL0B0cy1pZ25vcmVcclxuICAgIGtleTogZnVuY3Rpb24gKHJlcSwgZmlsZSwgY2IpIHtcclxuICAgICAgY2IobnVsbCwgRGF0ZS5ub3coKS50b1N0cmluZygpICsgZmlsZS5vcmlnaW5hbG5hbWUpXHJcbiAgICB9XHJcbiAgfSlcclxufSk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHVwbG9hZDsiXX0=