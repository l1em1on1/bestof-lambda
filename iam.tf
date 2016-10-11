resource "aws_iam_role" "bestof_role" {
    name = "bestof_lambda"
    assume_role_policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": "sts:AssumeRole",
      "Principal": {
        "Service": "lambda.amazonaws.com"
      },
      "Effect": "Allow",
      "Sid": ""
    }
  ]
}
EOF
}

resource "aws_iam_policy" "bestof_policy_logs" {
    name = "bestof_policy_logs"
    path = "/"
    description = "Access to logs"
    policy = <<EOF
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Action": [
                "logs:*"
            ],
            "Effect": "Allow",
            "Resource": "*"
        }
    ]
}
EOF
}

resource "aws_iam_policy" "bestof_policy_dynamodb_profiles" {
    name = "bestof_policy_dynamodb_profiles"
    path = "/"
    description = "Access to dynamodb profile tables"
    policy = <<EOF
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "dynamodb:BatchGetItem",
                "dynamodb:BatchWriteItem",
                "dynamodb:DeleteItem",
                "dynamodb:GetItem",
                "dynamodb:GetRecords",
                "dynamodb:PutItem",
                "dynamodb:Query",
                "dynamodb:Scan",
                "dynamodb:UpdateItem"
            ],
            "Resource": [
                "${aws_dynamodb_table.bestof_dynamodb_profiles.arn}",
                "${aws_dynamodb_table.bestof_dynamodb_profiles_in_topics.arn}"
            ]
        }
    ]
}
EOF
}

resource "aws_iam_policy_attachment" "bestof_attachement_policy_logs" {  
  name = "bestof_attachement_policy_logs"
  roles = ["${aws_iam_role.bestof_role.name}"]
  policy_arn = "${aws_iam_policy.bestof_policy_logs.arn}"
}

resource "aws_iam_policy_attachment" "bestof_attachement_policy_dynamodb_profiles" {  
  name = "bestof_attachement_policy_dynamodb_profiles"
  roles = ["${aws_iam_role.bestof_role.name}"]
  policy_arn = "${aws_iam_policy.bestof_policy_dynamodb_profiles.arn}"
}

