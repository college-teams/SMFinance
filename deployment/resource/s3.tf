resource "aws_s3_bucket" "file_bucket" {
  bucket        = "smfinance-state"
  force_destroy = true

  tags = {
    Name        = "My bucket"
    Environment = "Dev"
  }
}

resource "aws_s3_bucket_public_access_block" "file_bucket_public_access_block" {
  bucket = aws_s3_bucket.file_bucket.id

  block_public_acls       = false
  block_public_policy     = false
  ignore_public_acls      = false
  restrict_public_buckets = false
}

data "aws_iam_policy_document" "allow_access_from_another_account" {
  statement {
    sid     = "AddPerm"
    effect  = "Allow"
    actions = ["*"]

    resources = [
      aws_s3_bucket.file_bucket.arn,
      "${aws_s3_bucket.file_bucket.arn}/*",
    ]

    principals {
      type        = "AWS"
      identifiers = ["*"]
    }
  }
}

resource "aws_s3_bucket_policy" "allow_access_from_another_account" {
  bucket = aws_s3_bucket.file_bucket.id
  policy = data.aws_iam_policy_document.allow_access_from_another_account.json

  depends_on = [aws_s3_bucket_public_access_block.file_bucket_public_access_block]
}
