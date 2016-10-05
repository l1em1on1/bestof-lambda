resource "aws_dynamodb_table" "basic-dynamodb-table" {
    name = "BestOfProfiles"
    read_capacity = 1
    write_capacity = 1
    hash_key = "ProfileId"
    range_key = "Name"
    attribute {
      name = "ProfileId"
      type = "S"
    }
    attribute {
      name = "Name"
      type = "S"
    }
}
