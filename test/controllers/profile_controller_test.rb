require "test_helper"

class ProfileControllerTest < ActionDispatch::IntegrationTest
  test "should get v1/index" do
    get profile_v1/index_url
    assert_response :success
  end
end
